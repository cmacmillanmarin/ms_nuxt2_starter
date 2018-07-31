<!--
    layouts/default.vue
-->

<template>
    <div class="l-default">
        <organism-header />
        <div class="content">
            <nuxt />
        </div>
        <organism-footer />
    </div>
</template>

<script>

    import OrganismHeader from "~/components/organisms/Header";
    import OrganismFooter from "~/components/organisms/Footer";

    export default {

        name: "default",

        components: {

            OrganismHeader,
            OrganismFooter
        }
    }

</script>
