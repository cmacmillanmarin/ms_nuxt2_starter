<!--
    pages/_lang/about.vue
-->

<template>
    <div class="p-about pageLayout">
        <div class="person" v-for="(person, key) in team" :key="key" v-if="person">
            <span v-text="person.name" /> ->
            <nuxt-link :to="{ name: 'lang-person-id', params: { id: key } }" v-text="$t('p-about:profile:title')" />
        </div>
    </div>
</template>

<script>

    import Head from "~/mixins/Head";
    import Transitions from "~/mixins/Transitions";

    export default {
        name: "about",
        mixins: [ Head, Transitions ],
        async asyncData ({ app, error }) {
            const req = require("~/static/data/people/all.json");
            const team = req.content;
            if (!team) return error({ statusCode: 404 });
            return {
                team,
                head: {
                    title: app.i18n.t('p-about:title'),
                    meta: {
                        description: app.i18n.t('p-about:description')
                    }
                }
            };
        },
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
