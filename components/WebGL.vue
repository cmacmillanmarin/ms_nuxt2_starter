<!--
    components/WebGL.vue
-->

<template>
    <canvas class="webgl" />
</template>

<script>

import {mapState} from "vuex";

import VS from "~/assets/js/includes/glsl/vs.glsl";
import FS from "~/assets/js/includes/glsl/fs.glsl";

import MediaSource from "~/mixins/MediaSource";
import ResizeHandler from "~/mixins/ResizeHandler";
import LifecycleHooks from "~/mixins/LifecycleHooks";

export default {
    name: "WebGL",
    mixins: [LifecycleHooks, MediaSource, ResizeHandler],
    props: {
        image: Object
    },
    computed: {
        ...mapState({
            vs: state=>state.viewportSize
        })
    },
    methods: {
        async init() {
            this._onMessage = this.onMessage.bind(this);
            this._loader = await this.$core.loader.get();
            this._loader.worker.postMessage({index: this._loader.index, type: "img", src: this.getImageSourceFromObject(this.image, 500)});
            this._loader.worker.addEventListener("message", this._onMessage);
        },
        async onMessage(e) {
            const {src} = e.data;
            this._img = new Image();
            this._img.src = src;
            await this._img.decode();
            this.start();
            URL.revokeObjectURL(src);
            this._loader.worker.removeEventListener("message", this._onMessage);
        },
        start() {
            const {
                Scene,
                Renderer,
                PerspectiveCamera,
                Mesh,
                Material,
                PlaneBufferGeometry
            } = this.$core.webgl;

            this.scene = new Scene();
            this.renderer = new Renderer({canvas: this.$el, alpha: true, depth: false, stencil: false, premultipliedAlpha: false});
            this.renderer._clearColor = [1.0, 1.0, 1.0, 0.0];
            this.camera = new PerspectiveCamera(45, this.vs.w / this.vs.h, 1, 1000);
            this.camera.scale.y *= -1;

            this.plane = new Mesh(
                new PlaneBufferGeometry(1, 1, 128, 128),
                new Material({
                    vertexShader: VS,
                    fragmentShader: FS,
                    uniforms: {
                        img: {type: "t", value: this._img},
                        time: {type: "f", value: 0},
                        progress: {type: "f", value: 0}
                    },
                    transparent: true
                })
            );
            const scale = {x: 1, y: 1};
            const position = {x: 0, y: 0};
            this.plane.scale.x = scale.x;
            this.plane.scale.y = scale.y;
            // Position from screen to canvas available
            // const {x, y} = this.canvasPositionFrom(position, scale, this.vs);
            this.plane.position.x = 0;
            this.plane.position.y = 0;
            this.plane.position.z = -2;
            this.scene.add(this.plane);

            this.updateSize();
            this.$core.events.addEventListener(this.$core.events.RAF, this.render);
            this.$core.tween({targets: this.plane.material.uniforms.progress, value: 1, easing: "o1", duration: 1500, delay: 500});
        },
        updateSize() {
            const {w, h} = this.vs;
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
        },
        canvasPositionFrom(position, scale, canvasSize) {
            const x = position.x - canvasSize.w * 0.5 + scale.x * 0.5;
            const y = position.y - canvasSize.h * 0.5 + scale.y * 0.5;
            return {x, y};
        },
        render(e) {
            const {now} = e.params;
            this.plane.material.uniforms.time.value = now * 0.0015;
            this.renderer.render(this.scene, this.camera);
        },
        onResize() {
            this.updateSize();
        },
        removeListeners() {
            this.$core.tween.remove(this.plane.material.uniforms.progress);
            this.$core.events.removeEventListener(this.$core.events.RAF, this.render);
        }
    }
};
</script>

<style lang="scss">
    .webgl {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
