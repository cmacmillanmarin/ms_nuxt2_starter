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

    import Head from "~/mixins/Head";
    import Transitions from "~/mixins/Transitions";

    import MoleculeEvents from "~/components/molecules/Events";
    import MoleculeEventsVuex from "~/components/molecules/EventsVuex";

    export default {
        name: "events",
        layout: "event",
        mixins: [ Head, Transitions ],
        data() {
            return {
                head: {
                    title: this.$t('p-events:title'),
                    meta: {
                        description: this.$t('p-events:description')
                    }
                }
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
