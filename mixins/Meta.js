//
//  components/types/mixins/Meta.js

export default {
    head() {
        return {
            title: this.$t(`p-${this.$route.name.replace("lang-", "")}:title`),
            link: [
                { rel: "icon", type: "image/x-icon", href: "/img/favicon/favicon-16x16.png" },
                { rel: "apple-touch-icon", sizes: "76x76", href: "/img/favicon/apple-touch-icon.png" },
                { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/favicon/favicon-32x32.png" },
                { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/favicon/favicon-16x16.png" },
                { rel: "manifest", href: "/img/favicon/site.webmanifest" },
                { rel: "mask-icon", href: "/img/favicon/safari-pinned-tab.svg", color: "#5bbad5" },
                { rel: "canonical", href: `https://burundanga.studio/typeform${this.$route.path}` },
                { rel: "publisher", href: "https://plus.google.com/+Typeform" }
            ],
            meta: [
                { charset: "utf-8" },

                { hid: "viewport", name: "viewport", content: "width=device-width, initial-scale=1" },
                { hid: "msapplication-TileColor", name: "msapplication-TileColor", content:"#ffffff" },
                { hid: "msapplication-TileImage", name: "msapplication-TileImage", content:"/img/favicon/ms-icon-144x144.png" },
                { hid: "theme-color", name: "theme-color", content:"#ffffff" },

                { hid: "description", name: "description", content: this.$t("meta:description") },

                { hid: "og:locale", property: "og:locale", content: this.$route.params.lang },
                { hid: "og:title", property: "og:title", content: this.$t(`p-${this.$route.name.replace("lang-", "")}:title`) },
                { hid: "og:type", property: "og:type", content: this.$t(`p-${this.$route.name.replace("lang-", "")}:type`) },
                { hid: "og:url", property: "og:url", content: `https://burundanga.studio/typeform${this.$route.path}` },
                { hid: "og:site_name", property: "og:site_name", content: this.$t("meta:og:site_name") },
                { hid: "og:description", property: "og:description", content: this.$t("meta:og:description") },
                { hid: "og:image", property: "og:image", content: this.$t("meta:og:image") },
                { hid: "og:image:secure_url", property: "og:image:secure_url", content: this.$t("meta:og:image") },
                { hid: "article:publisher", property: "article:publisher", content: "https://www.facebook.com/typeform" },

                { hid: "twitter:card", name: "twitter:card", content: "summary" },
                { hid: "twitter:site", name: "twitter:site", content: "@typeform" },
                { hid: "twitter:creator", name: "twitter:creator", content: "@typeform" },
                { hid: "twitter:title", name: "twitter:title", content: this.$t(`p-${this.$route.name.replace("lang-", "")}:title`) },
                { hid: "twitter:description", name: "twitter:description", content: this.$t("meta:twitter:description") },
                { hid: "twitter:image", name: "twitter:image", content: this.$t("meta:twitter:image") }
            ]
        }
    }
}
