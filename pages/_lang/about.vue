<!--
    pages/_lang/about.vue
-->

<template>
    <div class="p-about pageLayout">
        <p class="title" v-text="$t('p-about:title')" />
        <div class="person" v-for="(person, key) in team" :key="key" v-if="person">
            <span v-text="person.name" /> ->
            <nuxt-link :to="{ name: 'lang-person-id', params: { id: key } }" v-text="$t('p-about:profile:title')" />
        </div>
    </div>
</template>

<script>

    import Transitions from "~/mixins/Transitions";

    export default {
        name: "about",
        mixins: [ Transitions ],
        head () {
            return {
                title: `BurundangaStudio NUXT | ${this.$t('p-about:name')}`
            }
        },
        async asyncData ({ app, params, error }) {
            const req = require("~/static/data/people/all.json");
            const team = req.content;
            if (!team) return error({ statusCode: 404 });
            return {
                team
            };
        }
    }

</script>

<style lang="scss" scoped>

    .p-about {
        padding: 20px;
        text-align: left;
        .title {
            font-weight: bold;
            padding-bottom: 10px;
        }
        .person {
            padding-bottom: 5px;
        }
    }

</style>
