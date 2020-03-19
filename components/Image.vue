s<template>
    <div :class="`image r${data.ratio}`">
        <img :data-src="data.src" :alt="data.alt">
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
            default: ()=>{ return {src: "", alt: "", ratio: ""}; }
        }
    },
    data() {
        return {
            src: ""
        };
    },
    watch: {
        src() {
            this.loadSrc();
        }
    },
    methods: {
        init() {
            this._img = this.$el.querySelector("img");
            this._onMessage = this.onMessage.bind(this);
            this.updateSrc();
        },
        onResize() {
            this.updateSrc();
        },
        updateSrc() {
            this.src = this.getImageSourceFromObject(this.data, this.$el.offsetWidth);
        },
        async loadSrc() {
            this._loader = await this.$core.loader.get();
            this._loader.worker.postMessage({index: this._loader.index, type: "img", src: this.src});
            this._loader.worker.addEventListener("message", this._onMessage);
        },
        onMessage(e) {
            const {src} = e.data;
            if (!src) return;
            if (this._loaded) {
                this._img.remove();
                this._img = new Image();
                this._img.alt = this.data.alt;
            }
            this._img.src = src;
            this._img.decode().then(this.onLoaded.bind(this));
            this._loader.worker.removeEventListener("message", this._onMessage);
        },
        onLoaded() {
            URL.revokeObjectURL(this.src);
            this._loaded && this.$el.appendChild(this._img);
            this._loaded = true;
        }
    }
};

</script>

<style lang="scss">

    .image {
        position: relative;
        font-size: 0;
        img {
            width: 100%;
            display: block;
            margin: 0;
            padding: 0;
        }
    }
</style>
