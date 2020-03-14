<!--
    pages/home.vue
-->

<template>
    <div class="page home">
        <h1>Home</h1>
    </div>
</template>

<script>

import Head from "~/mixins/Head";
import Transitions from "~/mixins/Transitions";
import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

export default {
    name: "Index",
    mixins: [Head, LifecycleHooks, Transitions, ResponsiveTemplate],
    asyncData({$core}) {
        return {
            page: $core.content.pages.home
        };
    },
    methods: {
        setInitValue() {},
        entered() {},
        init() {}
    }
};

</script>

<style lang="scss">

    .home {
        width: 100%;
        padding: 100px 0;
        text-align: center;
    }

</style>
