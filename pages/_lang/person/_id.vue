<!--
    pages/_lang/b-reeler.vue
-->

<template>
    <div class="p-bReeler pageLayout">
        <p class="name" v-text="worker.name" />
    </div>
</template>

<script>

    import Transitions from "~/mixins/Transitions";

    export default {
        name: "bReeler",
        mixins: [ Transitions ],
        head () {
            return {
                title: `BurundangaStudio NUXT | ${this.worker.name}`
            }
        },
        async asyncData ({ app, params, error, payload }) {
            if (payload) return { worker: payload };
            const id = params.id;
            const req = await app.$axios.$get(`https://www.jsonstore.io/91a0754e7f37cc115ba33deb007d13276d6c1f8f309e44f084d4278c51c5fe08/people/${id}`);
            const worker = req.result;
            if (!worker) return error({ statusCode: 404 });
            return {
                worker
            };
        }
    }

</script>

<style lang="scss" scoped>

    .p-bReeler {
        padding: 55px;
        img {
            width: 150px;
            height: 150px;
            margin-bottom: 20px;
            object-fit: cover;
            border-radius: 50%;
        }
        .name {
            font-weight: bold;
            font-size: 20px;
        }
        .role {
            padding-bottom: 5px;
        }
    }

</style>
