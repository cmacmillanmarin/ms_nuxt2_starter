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
        head() {
            return {
                title: `NUXT Boilerplate | ${this.worker.name}`,
                bodyAttrs: {
                    class: "__body"
                },
                link: [
                    { rel: "icon", type: "image/x-icon", href: "/favico.ico" },
                    { rel: "canonical", href: `http://burundanga.studio/nuxt_boilerplate${this.$route.path}` },
                    { rel: "publisher", href: "https://plus.google.com/+cmacmillanmarin" }
                ],
                meta: [
                    { charset: "utf-8" },

                    { hid: "viewport", name: "viewport", content: "width=device-width, initial-scale=1" },
                    { hid: "msapplication-TileColor", name: "msapplication-TileColor", content:"#ffffff" },
                    { hid: "msapplication-TileImage", name: "msapplication-TileImage", content:"/img/favicon/ms-icon-144x144.png" },
                    { hid: "theme-color", name: "theme-color", content:"#ffffff" },

                    { hid: "description", name: "description", content: this.$t('p-about:description') },

                    { hid: "og:locale", property: "og:locale", content: this.$route.params.lang },
                    { hid: "og:title", property: "og:title", content: this.worker.name },
                    { hid: "og:type", property: "og:type", content: "website" },
                    { hid: "og:url", property: "og:url", content: `http://burundanga.studio/nuxt_boilerplate${this.$route.path}` },
                    { hid: "og:site_name", property: "og:site_name", content: this.worker.name },
                    { hid: "og:description", property: "og:description", content: this.$t('p-about:description') },
                    { hid: "og:image", property: "og:image", content: "http://burundanga.studio/nuxt_boilerplate/img/share@2x.jpg" },
                    { hid: "og:image:secure_url", property: "og:image:secure_url", content: "http://burundanga.studio/nuxt_boilerplate/img/share@2x.jpg" },
                    { hid: "article:publisher", property: "article:publisher", content: "https://www.facebook.com/cmacmillanmarin" },

                    { hid: "twitter:card", name: "twitter:card", content: "summary" },
                    { hid: "twitter:site", name: "twitter:site", content: "@Burundanga_BCN" },
                    { hid: "twitter:creator", name: "twitter:creator", content: "@Burundanga_BCN" },
                    { hid: "twitter:title", name: "twitter:title", content: this.worker.name },
                    { hid: "twitter:description", name: "twitter:description", content: this.$t('p-about:description') },
                    { hid: "twitter:image", name: "twitter:image", content: "http://burundanga.studio/nuxt_boilerplate/img/share.jpg" }
                ]
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
