<!--
    components/Threejs.vue
-->

<template>
    <canvas class="threejs" />
</template>

<script>

import {mapState} from "vuex";

import MediaSource from "~/mixins/MediaSource";
import ResizeHandler from "~/mixins/ResizeHandler";
import LifecycleHooks from "~/mixins/LifecycleHooks";

import VS from "~/assets/js/includes/glsl/particles/vs.glsl";
import FS from "~/assets/js/includes/glsl/particles/fs.glsl";

export default {
    name: "Threejs",
    mixins: [LifecycleHooks, MediaSource, ResizeHandler],
    props: {
        image: Object
    },
    computed: {
        ...mapState({
            vs: state=>state.viewportSize,
            dpr: state=>state.devicePixelRatio
        }),
        preload() {
            return [
                {type: "library", src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"},
                {type: "library", src: "https://threejs.org/examples/js/controls/OrbitControls.js"},
                {type: "img", src: `${process.env.baseUrl}/img/Tokyo_.jpg`}
            ];
        }
    },
    methods: {
        async init() {
            this._loaded = 0;
            this._onMessage = this.onMessage.bind(this);
            this._loader = await this.$core.loader.get();
            this._loader.worker.postMessage({index: this._loader.index, ...this.preload[this._loaded]});
            this._loader.worker.addEventListener("message", this._onMessage);
        },
        async onMessage(e) {
            const {type, src} = e.data
            if (type === "library") {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = src;
                document.body.appendChild(script);
                script.onload = this.onLoaded.bind(this);
            } else if (type === "img") {
                this._img = new Image();
                this._img.src = src;
                await this._img.decode();
                this.onLoaded();
            }            
        },
        onLoaded() {
            this._loaded++;
            if (this._loaded === this.preload.length) {
                this._loader.worker.removeEventListener("message", this._onMessage); 
                const loader = new THREE.TextureLoader();
                loader.load(this._img.src, texture => {
                    this.texture = texture;
                    this.texture.minFilter = THREE.LinearFilter;
                    this.texture.magFilter = THREE.LinearFilter;
                    this.texture.format = THREE.RGBFormat;
                    this.width = texture.image.width;
                    this.height = texture.image.height;
                    this.start();
                });
            } else {
                this._loader.worker.postMessage({index: this._loader.index, ...this.preload[this._loaded]});
            }
        },
        start() {
            this.scene = new THREE.Scene();

            this.renderer = new THREE.WebGLRenderer({canvas: this.$el, alpha: true});
            this.renderer.setClearColor(0x1f1f1f, 1);
			this.renderer.setPixelRatio(this.dpr);
			this.renderer.setSize(this.vs.w, this.vs.h);

            this.camera = new THREE.PerspectiveCamera(45, this.vs.w / this.vs.h , 1, 5000);
            this.camera.position.set(0, 0, 300);

            this.controls = new THREE.OrbitControls(this.camera, this.$el);

            this.particles = this.getParticles();
            this.scene.add(this.particles);

            this.$core.events.addEventListener(this.$core.events.RAF, this.render);
        },
        getParticles() {
            this.numPoints = this.width * this.height;

            let discard = true;
            let numVisible = this.numPoints;
            let threshold = 0;
            let originalColors;

            if (discard) {
                numVisible = 0;
                threshold = 20;

                const img = this.texture.image;
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = this.width;
                canvas.height = this.height;
                ctx.scale(1, -1);
                ctx.drawImage(img, 0, 0, this.width, this.height * -1);

                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                originalColors = Float32Array.from(imgData.data);
                for (let i = 0; i < this.numPoints; i++) {
                    if (originalColors[i * 4 + 0] > threshold) numVisible++;
                }
            }

            const geometry = new THREE.InstancedBufferGeometry();

            // positions
            const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
            positions.setXYZ(0, -0.5, 0.5, 0.0);
            positions.setXYZ(1, 0.5, 0.5, 0.0);
            positions.setXYZ(2, -0.5, -0.5, 0.0);
            positions.setXYZ(3, 0.5, -0.5, 0.0);
            geometry.setAttribute("position", positions);

            // uvs
            const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
            uvs.setXYZ(0, 0.0, 0.0);
            uvs.setXYZ(1, 1.0, 0.0);
            uvs.setXYZ(2, 0.0, 1.0);
            uvs.setXYZ(3, 1.0, 1.0);
            geometry.setAttribute("uv", uvs);

            // index
            geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([ 0, 2, 1, 2, 3, 1 ]), 1));

            const indices = new Uint16Array(this.numPoints);
            const offsets = new Float32Array(this.numPoints * 3);
            const angles = new Float32Array(this.numPoints);

            for (let i = 0, j = 0; i < this.numPoints; i++) {
                if (discard && originalColors[i * 4 + 0] <= threshold) continue;

                offsets[j * 3 + 0] = i % this.width;
                offsets[j * 3 + 1] = Math.floor(i / this.width);
                offsets[j * 3 + 2] = Math.random() * 5;

                offsets[(j + 1) * 3 + 0] = this.width * 0.5 + Math.random() * 5;
                offsets[(j + 1) * 3 + 1] = Math.floor(i / this.width);
                offsets[(j + 1) * 3 + 2] = i % this.width - this.width * 0.5;

                indices[j] = i;
                indices[j+1] = i;

                angles[j] = Math.random() * Math.PI;
                angles[j+1] = Math.random() * Math.PI;

                j = j + 2;
            }

            geometry.setAttribute("pindex", new THREE.InstancedBufferAttribute(indices, 1, false));
            geometry.setAttribute("offset", new THREE.InstancedBufferAttribute(offsets, 3, false));
            geometry.setAttribute("angle", new THREE.InstancedBufferAttribute(angles, 1, false));

            const material = new THREE.RawShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uRandom: { value: 1.5 },
                    uDepth: { value: 3.0 },
                    uSize: { value: 1.0 },
                    uTextureSize: { value: new THREE.Vector2(this.width, this.height) },
                    uTexture: { value: this.texture },
                    uTouch: { value: null }
                },
                vertexShader: VS,
                fragmentShader: FS,
                depthTest: false,
                transparent: true
            });
            return new THREE.Mesh(geometry, material);
        },
        render(e) {
            const {now} = e.params;
            this.controls.update();
            this.particles.material.uniforms.uTime.value = now * 0.001;
            this.renderer.render(this.scene, this.camera);
        },
        onResize() {
            const {w, h} = this.vs;
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
        },
        removeListeners() {
            this.$core.events.removeEventListener(this.$core.events.RAF, this.render);
        }
    }
};
</script>

<style lang="scss">
    .threejs {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
