<!--
    components/Threejs.vue
-->

<template>
    <canvas class="threejs" />
</template>

<script>

import {mapState} from "vuex";

// import VS from "~/assets/js/includes/glsl/vs.glsl";
// import FS from "~/assets/js/includes/glsl/fs.glsl";

import MediaSource from "~/mixins/MediaSource";
import ResizeHandler from "~/mixins/ResizeHandler";
import LifecycleHooks from "~/mixins/LifecycleHooks";

export default {
    name: "Threejs",
    mixins: [LifecycleHooks, MediaSource, ResizeHandler],
    props: {
        image: Object
    },
    computed: {
        ...mapState({
            viewportSize: state=>state.viewportSize,
            devicePixelRatio: state=>state.devicePixelRatio
        }),
        threeSrc() {
            return "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js";
        }
    },
    methods: {
        async init() {
            if (!window.THREE) {
                this._onMessage = this.onMessage.bind(this);
                this._loader = await this.$core.loader.get();
                this._loader.worker.postMessage({index: this._loader.index, type: "library", src: this.threeSrc});
                this._loader.worker.addEventListener("message", this._onMessage);
            } else {
                this.start();
            }
        },
        onMessage(e) {
            const {ok} = e.data;
            if (ok) {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = this.threeSrc;
                document.body.appendChild(script);
                script.onload = this.start.bind(this);
            }
        },
        start() {
            console.log(window.THREE);
        },
        updateSize() {
            // const {w, h} = this.viewportSize;
            // this.camera.left = w / -2;
            // this.camera.right = w / 2;
            // this.camera.top = h / 2;
            // this.camera.bottom = h / -2;
            // this.camera.updateProjectionMatrix();
            // this.renderer.setSize(w, h);
            // this.render();
        },
        render(e) {
            // this.renderer.render(this.scene, this.camera);
        },
        onResize() {
            // this.updateSize();
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
