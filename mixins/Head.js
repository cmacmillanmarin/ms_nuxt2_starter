//
//  components/types/mixins/Meta.js

const __baseUrl = "http://burundanga.studio/nuxt_boilerplate";
const __baseTitle = "NUXT Boilerplate | "
const __googleUser = "+cmacmillanmarin";
const __fbUser = "cmacmillanmarin";
const __twUser = "Burundanga_BCN";
const __twImage = `${__baseUrl}/img/share.jpg`;
const __ogImage = `${__baseUrl}/img/share@2x.jpg`;

export default {
    head() {
        return {
            title: __baseTitle + this.head.title,
            bodyAttrs: {
                class: "__body"
            },
            link: [
                { rel: "icon", type: "image/x-icon", href: "/favico.ico" },
                { rel: "canonical", href: `${__baseUrl}${this.$route.path}` },
                { rel: "publisher", href: `https://plus.google.com/${__googleUser}` }
            ],
            meta: [
                { charset: "utf-8" },

                { hid: "viewport", name: "viewport", content: "width=device-width, initial-scale=1" },
                { hid: "msapplication-TileColor", name: "msapplication-TileColor", content:"#ffffff" },
                { hid: "msapplication-TileImage", name: "msapplication-TileImage", content:"/img/favicon/ms-icon-144x144.png" },
                { hid: "theme-color", name: "theme-color", content:"#ffffff" },

                { hid: "description", name: "description", content: this.head.meta.description },

                { hid: "og:locale", property: "og:locale", content: this.$route.params.lang },
                { hid: "og:title", property: "og:title", content: this.head.title },
                { hid: "og:type", property: "og:type", content: "website" },
                { hid: "og:url", property: "og:url", content: `${__baseUrl}${this.$route.path}` },
                { hid: "og:site_name", property: "og:site_name", content: this.head.title },
                { hid: "og:description", property: "og:description", content: this.head.meta.description },
                { hid: "og:image", property: "og:image", content: __ogImage },
                { hid: "og:image:secure_url", property: "og:image:secure_url", content: __ogImage },
                { hid: "article:publisher", property: "article:publisher", content: `https://www.facebook.com/${__fbUser}` },

                { hid: "twitter:card", name: "twitter:card", content: "summary" },
                { hid: "twitter:site", name: "twitter:site", content: `@${__twUser}` },
                { hid: "twitter:creator", name: "twitter:creator", content: `@${__twUser}` },
                { hid: "twitter:title", name: "twitter:title", content: this.head.title },
                { hid: "twitter:description", name: "twitter:description", content: this.head.meta.description },
                { hid: "twitter:image", name: "twitter:image", content: __twImage }
            ],
            script: [
                // Preload JS files
                { src: "" }
            ],
        }
    }
}
