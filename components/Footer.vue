<!--
    components/Footer.vue
-->

<template>
    <footer>
        <in-grid>
            Footer
        </in-grid>
    </footer>
</template>

<script>

import InGrid from "~/components/InGrid";

export default {
    name: "Footer",
    components: {
        InGrid
    }
};
</script>

<style lang="scss">
    footer {
        width: 100%;
        padding-bottom: 100px;
    }
</style>
