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
        background: black;
        .in-grid-layout {
            color: white;
            padding: 50px 0 100px;
        }
    }
</style>
