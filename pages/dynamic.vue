<!--
    pages/dynamic.vue
-->

<template>
    <section class="page dynamic below-header">
        <in-grid>
            <h1>Dynamic Page</h1>
            <pre v-text="$route.params" />
        </in-grid>
    </section>
</template>

<script>

import Head from "~/mixins/Head";
import Transitions from "~/mixins/Transitions";
import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

import InGrid from "~/components/InGrid";

export default {
    name: "Dynamic",
    components: {
        InGrid
    },
    mixins: [Head, LifecycleHooks, Transitions, ResponsiveTemplate],
    asyncData({params}) {
        return {
            page: {
                head: {
                    title: `Dynamic page ${params.slug}`,
                    description: "Dynamic page Description"
                }
            }
        };
    },
    methods: {
        setInitValue() {},
        init() {},
        addListeners() {},
        removeListeners() {}
    }
};

</script>

<style lang="scss">

    // .dynamic {}

</style>
