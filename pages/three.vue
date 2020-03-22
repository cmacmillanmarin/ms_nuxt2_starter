<!--
    pages/threejs.vue
-->

<template>
    <section class="page three">
        <threejs />
    </section>
</template>

<script>

import Head from "~/mixins/Head";
import Transitions from "~/mixins/Transitions";

import Threejs from "~/components/Threejs";

export default {
    name: "Three",
    components: {
        Threejs
    },
    mixins: [Head, Transitions],
    asyncData({$core}) {
        return {
            page: $core.content.pages.three
        };
    }
};

</script>
