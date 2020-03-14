<!--
    pages/param.vue
-->

<template>
    <div class="page param">
        <h1>Param</h1>
    </div>
</template>

<script>

import Head from "~/mixins/Head";
import Transitions from "~/mixins/Transitions";
import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

export default {
    name: "Param",
    mixins: [Head, LifecycleHooks, Transitions, ResponsiveTemplate],
    validate({$core, params}) {
        return $core.content.pages[params.slug];
    },
    asyncData({$core, params}) {
        return {
            page: $core.content.pages[params.slug]
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

    .param {
        width: 100%;
        padding: 100px 0;
        text-align: center;
    }

</style>
