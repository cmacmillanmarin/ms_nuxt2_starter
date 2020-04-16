<!--
    components/WebGL.vue
-->

<template>
    <canvas class="c-webgl" />
</template>

<script>

import {mapState} from "vuex";

import VS from "~/assets/js/includes/glsl/webgl/vs.glsl";
import FS from "~/assets/js/includes/glsl/webgl/fs.glsl";

import MediaSource from "~/mixins/MediaSource";
import ResizeHandler from "~/mixins/ResizeHandler";
import LifecycleHooks from "~/mixins/LifecycleHooks";

export default {
    name: "WebGL",
    mixins: [LifecycleHooks, MediaSource, ResizeHandler],
    props: {
        images: Array,
        effects: Array
    },
    computed: {
        ...mapState({
            vs: state=>state.viewportSize
        })
    },
    data() {
        return {
            waves: false,
            water: false,
            slider: false
        }
    },
    watch: {
        effects() {
            this.waves = this.effects.indexOf("waves") >= 0;
            this.water = this.effects.indexOf("water") >= 0;
            this.slider = this.effects.indexOf("slider") >= 0;
        },
        waves() {
            this.$core.tween({targets: this.plane.material.uniforms.waves, value: this.waves ? 1 : 0, easing: "o1", duration: 1000});
        },
        water() {},
        slider() {
            const eventType = this.slider ? "add" : "remove";
            this.$core.tween({targets: this.plane.material.uniforms.slider, value: this.slider ? 1 : 0, easing: "o1", duration: 1000});
            this.$core.events[`${eventType}EventListener`](this.$core.events.WHEEL, this.onWheel);
        }
    },
    methods: {
        async init() {
            this._imgs = [];
            this._index = 0;
            this._onMessage = this.onMessage.bind(this);
            this._loader = await this.$core.loader.get();
            this._loader.worker.postMessage({index: this._loader.index, type: "img", src: this.getImageSourceFromId(this.images[this._index], 500)});
            this._loader.worker.addEventListener("message", this._onMessage);
        },
        async onMessage(e) {
            const {src} = e.data;
            const img = new Image();
            img.src = src;
            await img.decode();
            this._imgs.push(img);
            URL.revokeObjectURL(src);
            if (this._imgs.length === this.images.length) {
                this.start();
                this._loader.worker.removeEventListener("message", this._onMessage);
            } else {
                this._index++;
                this._loader.worker.postMessage({index: this._loader.index, type: "img", src: this.getImageSourceFromId(this.images[this._index], 500)});
            }            
        },
        start() {
            const {
                Scene,
                Renderer,
                PerspectiveCamera,
                Mesh,
                Material,
                PlaneBufferGeometry,
                Vector3
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
                        imgA: {type: "t", value: this._imgs[0]},
                        imgB: {type: "t", value: this._imgs[1]},
                        time: {type: "f", value: 0},
                        waves: {type: "f", value: 0},
                        slider: {type: "f", value: 0}
                    },
                    transparent: true
                })
            );
            const scale = 1.5; 
            const position = {x: 0, y: 0};
            this.plane.scale.x = scale * 0.5; // Images are 5/7 ratio
            this.plane.scale.y = scale * 0.7; // Images are 5/7 ratio
            // Position from screen to canvas available
            // const {x, y} = this.canvasPositionFrom(position, scale, this.vs);
            this.plane.position.x = 0;
            this.plane.position.y = 0;
            this.plane.position.z = -2;
            this.scene.add(this.plane);

            this.updateSize();
            this.$core.events.addEventListener(this.$core.events.RAF, this.render);
        },
        render(e) {
            const {now} = e.params;
            const time = now * 0.0015;
            this.plane.material.uniforms.time.value = time;            
            this.renderer.render(this.scene, this.camera);
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
        onWheel(e) {
            console.log(e);
        },
        onResize() {
            this.updateSize();
        },
        removeListeners() {
            this.$core.tween.remove(this.plane.material.uniforms.waves);
            this.$core.events.removeEventListener(this.$core.events.RAF, this.render);
            this.$core.events.removeEventListener(this.$core.events.WHEEL, this.onWheel);
        }
    }
};
</script>

<style lang="scss">
    .c-webgl {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: chartreuse;
    }
</style>
