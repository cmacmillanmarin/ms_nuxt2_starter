export const Side = Object.freeze({SIDE_FRONT: 1, SIDE_BACK: 2, SIDE_DOUBLE: 3});

export const getContext = (
    canvas,
    attributes = {}
)=>{
    const gl =
        canvas.getContext("webgl", attributes) ||
    canvas.getContext("experimental-webgl", attributes);

    return gl;
};

export const createShader = (
    gl,
    shaderSource,
    shaderType
)=>{
    const shader = gl.createShader(shaderType);

    gl.shaderSource(shader, shaderSource);

    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
        throw new Error(`could not compile shader:${gl.getShaderInfoLog(shader)}`);
    }

    return shader;
};

export const createProgram = (gl, vertexSource, fragmentSource)=>{
    const vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        gl.useProgram(program);
    } else {
        throw new Error(`program filed to link:${gl.getProgramInfoLog(program)}`);
    }

    return program;
};

export const createVbo = (gl, vertices)=>{
    const vbo = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
};

export const createIbo = (gl, index = [])=>{
    const ibo = gl.createBuffer();

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(index), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return ibo;
};

export const isPowerOf2 = (value)=>{
    return (value & (value - 1)) === 0;
};

export const createTexture = (gl, image, textureNumber)=>{
    const tex = gl.createTexture();
    gl.activeTexture(textureNumber);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    if (image instanceof HTMLImageElement) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        // Check if the image is a power of 2 in both dimensions.
        if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
            // Yes, it's a power of 2. Generate mips.
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            // No, it's not a power of 2. Turn off mips and set wrapping to clamp to edge
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);

        return tex;
    } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
        gl.bindTexture(gl.TEXTURE_2D, null);
        return tex;
    }
};

export const enabledDepthTest = (gl)=>{
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
};

export const switchCulling = (gl, side)=>{
    switch (side) {
    case Side.DOUBLE:
        gl.disable(gl.CULL_FACE);
        break;
    case Side.BACK:
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CW);
        break;
    case Side.FRONT:
    default:
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        break;
    }
};

export const switchBlending = (gl, transparent)=>{
    if (transparent) {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    } else {
        gl.disable(gl.BLEND);
    }
};

export const drawFace = (gl, index = [])=>{
    const ibo = createIbo(gl, index);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);
};

export const drawPoints = (gl, vertices = [])=>{
    gl.drawArrays(gl.POINTS, 0, vertices.length / 3);
};

export const clearColor = (gl, color = [0.0, 0.0, 0.0, 1.0], depth = 1.0)=>{
    gl.clearColor(color[0], color[1], color[2], color[3]);
    gl.clearDepth(depth);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.disable(gl.DEPTH_TEST);
};

export const getUniqueStr = (strong = 1000)=>{
    return (
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16)
    );
};
