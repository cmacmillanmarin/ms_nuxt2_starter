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
            this.src = this.data.type === "svg" ? this.data.src : this.getImageSourceFromObject(this.data, this.$el.offsetWidth);
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
