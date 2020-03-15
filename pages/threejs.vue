<!--
    pages/threejs.vue
-->

<template>
    <section class="page threejs" />
</template>

<script>

import Head from "~/mixins/Head";
import Transitions from "~/mixins/Transitions";

export default {
    name: "Threejs",
    mixins: [Head, Transitions],
    asyncData({$core}) {
        return {
            page: $core.content.pages.threejs
        };
    }
};

</script>

<style lang="scss">

    .threejs {
        text-align: center;
    }

</style>
