<!--
    pages/_lang/events.vue
-->

<template>
    <div class="p-events">
        <a @click="$router.go(-1)" v-text="$t('back')" />
        <molecule-events />
        <molecule-events-vuex />
    </div>
</template>

<script>


    import Transitions from "~/mixins/Transitions";

    import MoleculeEvents from "~/components/molecules/Events";
    import MoleculeEventsVuex from "~/components/molecules/EventsVuex";

    export default {
        name: "events",
        layout: "event",
        mixins: [ Transitions ],
        head () {
            return {
                title: `BurundangaStudio NUXT | ${this.$t('p-events:name')}`
            }
        },
        components: {
            MoleculeEvents,
            MoleculeEventsVuex
        }
    }

</script>

<style lang="scss" scoped>

    .p-events {
        a {
            cursor: pointer;
            text-transform: uppercase;
            display: block;
            padding: 20px;
        }
    }

</style>
