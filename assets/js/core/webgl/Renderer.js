import Matrix4 from "./Matrix4";
import Mesh from "./Mesh";
import Points from "./Points";
import {
    getContext,
    createProgram,
    createVbo,
    createTexture,
    enabledDepthTest,
    switchBlending,
    switchCulling,
    drawFace,
    drawPoints,
    clearColor
} from "./utils";

class Renderer {
    set pixelRatio(value) {
        this._pixelRatio = value;
    }

    get pixelRatio() {
        return this._pixelRatio;
    }

    get domElement() {
        return this._domElement;
    }

    set clearColor(color) {
        this._clearColor = color;
    }

    constructor(parameters) {
        parameters = parameters || {};

        this._renderList = [];
        this._pMatrix = new Matrix4();
        this._width = 400;
        this._height = 300;

        this._pixelRatio = Math.min(2, window.devicePixelRatio);

        this._domElement = parameters.canvas !== undefined ? parameters.canvas : document.createElement("canvas");

        this._clearColor = [0.0, 0.0, 0.0, 0.0];

        const contextAttributes = {
            alpha: parameters.alpha !== undefined ? parameters.alpha : false,
            depth: parameters.depth !== undefined ? parameters.depth : true,
            stencil: parameters.stencil !== undefined ? parameters.stencil : true,
            antialias: parameters.antialias !== undefined ? parameters.antialias : false,
            premultipliedAlpha: parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
            preserveDrawingBuffer: parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
            powerPreference: parameters.powerPreference !== undefined ? parameters.powerPreference : "default",
            failIfMajorPerformanceCaveat: parameters.failIfMajorPerformanceCaveat !== undefined ? parameters.failIfMajorPerformanceCaveat : false
        };

        this._gl = getContext(this._domElement, contextAttributes);
        this.setSize(this._width, this._height);
    }

    setSize(w, h) {
        const canvasW = w * this._pixelRatio;
        const canvasH = h * this._pixelRatio;

        this._width = w;
        this._height = h;

        this._domElement.style.width = this._width + "px";
        this._domElement.style.height = this._height + "px";

        this._domElement.width = canvasW;
        this._domElement.height = canvasH;
        this._gl.viewport(0, 0, canvasW, canvasH);
        this._pMatrix.perspective(90, canvasW / canvasH, 0.1, 100);
    }

    render(scene, camera) {
        clearColor(this._gl, this._clearColor);

        scene.updateMatrixWorld();
        camera.updateMatrixWorld();

        if (scene.needsUpdate) {
            this._renderList = [];
            this._projectObject(scene);
            scene.needsUpdate = false;
        }

        this._renderList.forEach((renderItem)=>{
            this._renderObj(renderItem, camera);
        });

        this._gl.flush();
    }

    _projectObject(obj) {
        if (obj instanceof Mesh || obj instanceof Points) {
            const program = createProgram(
                this._gl,
                obj.material.vertexShader,
                obj.material.fragmentShader
            );

            const attributes = {};
            Object.keys(obj.geometry.attributes).forEach((name)=>{
                const attribute = obj.geometry.attributes[name];
                const attributeInfo = {
                    vbo: createVbo(this._gl, attribute.vertices),
                    attrLoc: this._gl.getAttribLocation(program, name),
                    stride: attribute.stride
                };
                attributes[name] = attributeInfo;
            });

            const uniforms = {};
            let textureUnit = 0;
            Object.keys(obj.material.uniforms).forEach((name)=>{
                const originUniform = obj.material.uniforms[name];
                uniforms[name] = this._gl.getUniformLocation(program, name);

                if (originUniform.type === "t") {
                    const slot = this._gl.TEXTURE0 + textureUnit;
                    const image = originUniform.value;
                    const webglTexture = createTexture(this._gl, image, slot);
                    const tex = {image, webglTexture};
                    obj.material._maps[textureUnit] = tex;
                    textureUnit++;
                }
            });

            const renderItem = {
                obj,
                program,
                attributes,
                uniforms
            };

            this._renderList.push(renderItem);
        }

        obj.children.forEach((child)=>{
            this._projectObject(child);
        });
    }

    _renderObj(renderItem, camera) {
        const obj = renderItem.obj;
        const prg = renderItem.program;
        const attributes = renderItem.attributes;
        const uniforms = renderItem.uniforms;
        const geometry = obj.geometry;
        const material = obj.material;

        obj.modelViewMatrix.multiplyMatrices(
            camera.matrixWorldInverse,
            obj.matrixWorld
        );

        Object.keys(attributes).forEach((name)=>{
            const attribute = attributes[name];
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, attribute.vbo);
            this._gl.enableVertexAttribArray(attribute.attrLoc);
            this._gl.vertexAttribPointer(
                attribute.attrLoc,
                attribute.stride,
                this._gl.FLOAT,
                false,
                0,
                0
            );
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
        });

        this._gl.useProgram(prg);

        material.uniforms.mMatrix.value = obj.matrix;
        material.uniforms.vMatrix.value = camera.matrixWorldInverse;
        material.uniforms.pMatrix.value = camera.projectionMatrix;
        material.uniforms.mvMatrix.value = obj.modelViewMatrix;
        let textureUnit = 0;
        Object.keys(uniforms).forEach((name)=>{
            const uniformLoc = uniforms[name];
            const uniform = material.uniforms[name];
            switch (uniform.type) {
            case "v4":
                this._gl.uniformMatrix4fv(uniformLoc, false, uniform.value.el);
                break;
            case "v3":
                this._gl.uniform3f(uniformLoc, uniform.value.x, uniform.value.y, uniform.value.z);
                break;
            case "v2":
                this._gl.uniform2f(uniformLoc, uniform.value.x, uniform.value.y);
                break;
            case "f":
                this._gl.uniform1f(uniformLoc, uniform.value);
                break;
            case "t": {
                const texture = material._maps.find((t)=>{
                    return uniform.value !== null && t.image !== null && t.image.src === uniform.value.src;
                });
                if (texture) {
                    this._gl.activeTexture(this._gl.TEXTURE0 + textureUnit);
                    this._gl.bindTexture(this._gl.TEXTURE_2D, texture.webglTexture);
                    this._gl.uniform1i(uniformLoc, textureUnit);
                } else {
                    const image = uniform.value;
                    const oldTex = material._maps[textureUnit];
                    if (oldTex) {
                        // avoid flickering when delete and bind texture in the same frame
                        setTimeout(()=>{
                            this._gl.deleteTexture(oldTex.webglTexture);
                            oldTex.image = null;
                        }, 0);
                    }
                    const webglTexture = createTexture(this._gl, image, this._gl.TEXTURE0 + textureUnit);
                    material._maps[textureUnit] = {image, webglTexture};
                    this._gl.activeTexture(this._gl.TEXTURE0 + textureUnit);
                    this._gl.bindTexture(this._gl.TEXTURE_2D, webglTexture);
                    this._gl.uniform1i(uniformLoc, textureUnit);
                }
                textureUnit++;
                break;
            }
            }
        });

        enabledDepthTest(this._gl);

        switchBlending(this._gl, material.transparent);

        switchCulling(this._gl, material.side);

        if (obj instanceof Mesh) {
            drawFace(this._gl, geometry.index);
        } else if (obj instanceof Points) {
            drawPoints(this._gl, geometry.attributes.position.vertices);
        }
    }
}

export default Renderer;
