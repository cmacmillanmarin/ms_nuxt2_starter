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
            viewportSize: state=>state.viewportSize,
            devicePixelRatio: state=>state.devicePixelRatio
        })
    },
    methods: {
        async init() {
            const {
                Renderer,
                OrthographicCamera,
                Scene,
                Material,
                Mesh,
                PlaneBufferGeometry
            } = this.$core.webgl;
            const img = await this.$core.loader.loadAsset(this.getImageSourceFromObject(this.image, 500));

            this.scene = new Scene();
            this.renderer = new Renderer({canvas: this.$el, alpha: true, depth: false, stencil: false, premultipliedAlpha: false});
            this.renderer._clearColor = [1.0, 1.0, 1.0, 0.0];
            this.camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
            this.camera.scale.y *= -1;

            this.plane = new Mesh(
                new PlaneBufferGeometry(1, 1, 128, 128),
                new Material({
                    vertexShader: VS,
                    fragmentShader: FS,
                    uniforms: {
                        img: {type: "t", value: img}
                    },
                    transparent: true
                })
            );
            const scale = {x: 500, y: 500};
            const position = {x: 0, y: 0};
            this.plane.scale.x = scale.x;
            this.plane.scale.y = scale.y;
            const {x, y} = this.canvasPositionFrom(position, scale, this.viewportSize);
            console.log(`Position from screen to canvas available -> 0, 0 = ${x}, ${y}`);
            this.plane.position.x = 0;
            this.plane.position.y = 0;
            this.plane.position.z = -1;
            this.scene.add(this.plane);

            this.updateSize();
        },
        updateSize() {
            const {w, h} = this.viewportSize;
            this.camera.left = w / -2;
            this.camera.right = w / 2;
            this.camera.top = h / 2;
            this.camera.bottom = h / -2;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
            this.render();
        },
        canvasPositionFrom(position, scale, canvasSize) {
            const x = position.x - canvasSize.w * 0.5 + scale.x * 0.5;
            const y = position.y - canvasSize.h * 0.5 + scale.y * 0.5;
            return {x, y};
        },
        render(e) {
            this.renderer.render(this.scene, this.camera);
        },
        onResize() {
            this.updateSize();
        }
    }
};
</script>

<style lang="scss">
    .webgl {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
</style>
