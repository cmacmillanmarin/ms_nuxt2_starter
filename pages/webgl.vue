<!--
    pages/webgl.vue
-->

<template>
    <section class="page webgl">
        <web-g-l :image="$core.content.assets[page.image]" />
    </section>
</template>

<script>

import Head from "~/mixins/Head";
import Transitions from "~/mixins/Transitions";

import WebGL from "~/components/WebGL";

export default {
    name: "Webgl",
    components: {
        WebGL
    },
    mixins: [Head, Transitions],
    asyncData({$core}) {
        return {
            page: $core.content.pages.webgl
        };
    }
};

</script>

<style lang="scss">

    .webgl {
        text-align: center;
    }

</style>
