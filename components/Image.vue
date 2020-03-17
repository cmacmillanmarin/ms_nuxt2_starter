s<template>
    <div :class="`image r${data.ratio}`">
        <img ref="img" :src="src" :alt="data.alt">
    </div>
</template>

<script>

import MediaSource from "~/mixins/MediaSource";
import ResizeHandler from "~/mixins/ResizeHandler";
import LifecycleHooks from "~/mixins/LifecycleHooks";

export default {
    name: "ImageBase",
    mixins: [LifecycleHooks, ResizeHandler, MediaSource],
    props: {
        data: {
            type: Object,
            default: ()=>{ return {src: "", alt: "", type: "", ratio: ""}; }
        }
    },
    data() {
        return {
            src: ""
        };
    },
    watch: {
        data() {
            this.onResize();
        }
    },
    methods: {
        init() {
            this.onResize();
        },
        onResize() {
            const src = this.data.type === "svg" ? this.data.src : this.getImageSourceFromObject(this.data, this.$el.offsetWidth);
            this._worker = this.$core.loader.new();
            this._worker.postMessage({type: "img", src});
            this._worker.addEventListener("message", this.onMessage.bind(this));
        },
        onMessage(e) {
            const {src} = e.data;
            if (this.$refs.img) this.$refs.img.onload = this.onLoaded.bind(this);
            this.src = src;
        },
        onLoaded() {
            URL.revokeObjectURL(this.src);
            this._worker.terminate();
        }
    }
};

</script>

<style lang="scss">

    .image {
        position: relative;
        font-size: 0;
        will-change: opacity;
        img {
            width: 100%;
            display: block;
            margin: 0;
            padding: 0;
        }
    }
</style>
