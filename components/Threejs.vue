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
        })
    },
    methods: {
        init() {
            if (!window.THREE) {
                this.$core.loader.worker.postMessage({ type: "library", src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js" });
                this.$core.loader.worker.onmessage = this.loaded.bind(this);
            }
        },
        loaded(event) {
            const {data} = event;
            console.log("Component", data);
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
