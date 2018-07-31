<!--
    components/atoms/Logo.vue
-->

<template>
    <img class="a-logo" :src="data.src" :alt="$t(data.alt)" />
</template>

<script>

    const data = { src: "./img/logo.jpg", alt: "o-header:assets:logo:alt" };

    export default {
        name: "Logo",
        props: {
            data: {
                type: Object,
                default: () => data
            }
        }
    }

</script>

<style lang="scss" scoped>

    .a-logo {
        display: block;
        margin: 0;
        padding: 0;
    }

</style>


