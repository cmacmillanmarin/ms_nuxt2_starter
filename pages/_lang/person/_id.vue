<!--
    pages/_lang/person.vue
-->

<template>
    <div class="p-person pageLayout">
        <p class="name" v-text="worker.name" />
    </div>
</template>

<script>

    import Transitions from "~/mixins/Transitions";

    export default {
        name: "person",
        mixins: [ Transitions ],
        head () {
            return {
                title: `BurundangaStudio NUXT | ${this.worker.name}`
            }
        },
        async asyncData ({ app, params, error, payload }) {
            if (payload) return { worker: payload };
            const req = require(`~/static/data/people/${params.id}.json`);
            const worker = req.content;
            if (!worker) return error({ statusCode: 404 });
            return {
                worker
            };
        }
    }

</script>

<style lang="scss" scoped>

    .p-person {
        padding: 58px;
        .name {
            font-weight: bold;
            font-size: 20px;
            line-height: 25px;
        }
    }

</style>
