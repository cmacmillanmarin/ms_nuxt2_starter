//
//  components/types/mixins/Head.js

export default {
    head() {
        const lang = "en";
        const baseUrl = process.env.baseUrl;
        const {title, googleUser, fb, tw} = this.$core.content.config.head;
        const __twImage = `${baseUrl}/img/share_twitter.jpg`;
        const __ogImage = `${baseUrl}/img/share_facebook.jpg`;
        return {
            headAttrs: {},
            bodyAttrs: {},
            htmlAttrs: {
                lang
            },
            title: title + this.page.head.title,
            meta: [
                {charset: "utf-8"},
                {hid: "viewport", name: "viewport", content: "width=device-width, initial-scale=1"},
                {hid: "msapplication-TileColor", name: "msapplication-TileColor", content: "#ffffff"},
                {hid: "msapplication-TileImage", name: "msapplication-TileImage", content: `${baseUrl}/img/favicon/ms-icon-144x144.png`},
                {hid: "description", name: "description", content: this.page.head.description},
                {hid: "og:locale", property: "og:locale", content: lang},
                {hid: "og:title", property: "og:title", content: this.page.head.title},
                {hid: "og:type", property: "og:type", content: "website"},
                {hid: "og:url", property: "og:url", content: `${baseUrl}${this.$route.path}`},
                {hid: "og:site_name", property: "og:site_name", content: this.page.head.title},
                {hid: "og:description", property: "og:description", content: this.page.head.description},
                {hid: "og:image", property: "og:image", content: __ogImage},
                {hid: "og:image:secure_url", property: "og:image:secure_url", content: __ogImage},
                {hid: "article:publisher", property: "article:publisher", content: `https://www.facebook.com/${fb}`},
                {hid: "twitter:card", name: "twitter:card", content: "summary"},
                {hid: "twitter:site", name: "twitter:site", content: `@${tw}`},
                {hid: "twitter:creator", name: "twitter:creator", content: `@${tw}`},
                {hid: "twitter:title", name: "twitter:title", content: this.page.head.title},
                {hid: "twitter:description", name: "twitter:description", content: this.page.head.description},
                {hid: "twitter:image", name: "twitter:image", content: __twImage}
            ],
            link: [
                {rel: "canonical", href: `${baseUrl}${this.$route.path}`},
                {rel: "publisher", href: `https://plus.google.com/${googleUser}`},
                {rel: "icon", type: "image/x-icon", href: `${baseUrl}/img/favicon/favicon.ico`},
                {rel: "icon", sizes: "192x192", type: "image/png", href: `${baseUrl}/img/favicon/android-icon-192x192.png`},
                {rel: "icon", sizes: "16x16", type: "image/png", href: `${baseUrl}/img/favicon/favicon-16x16.png`},
                {rel: "icon", sizes: "32x32", type: "image/png", href: `${baseUrl}/img/favicon/favicon-32x32.png`},
                {rel: "icon", sizes: "96x96", type: "image/png", href: `${baseUrl}/img/favicon/favicon-96x96.png`},
                {rel: "apple-touch-icon", href: `${baseUrl}/img/favicon/apple-icon.png`},
                {rel: "apple-touch-icon", sizes: "57x57", type: "image/png", href: `${baseUrl}/img/favicon/apple-touch-icon-57x57.png`},
                {rel: "apple-touch-icon", sizes: "72x72", type: "image/png", href: `${baseUrl}/img/favicon/apple-touch-icon-72x72.png`},
                {rel: "apple-touch-icon", sizes: "76x76", type: "image/png", href: `${baseUrl}/img/favicon/apple-touch-icon-76x76.png`},
                {rel: "apple-touch-icon", sizes: "114x114", type: "image/png", href: `${baseUrl}/img/favicon/apple-touch-icon-114x114.png`},
                {rel: "apple-touch-icon", sizes: "120x120", type: "image/png", href: `${baseUrl}/img/favicon/apple-touch-icon-120x120.png`},
                {rel: "apple-touch-icon", sizes: "144x144", type: "image/png", href: `${baseUrl}/img/favicon/apple-touch-icon-144x144.png`},
                {rel: "apple-touch-icon", sizes: "152x152", type: "image/png", href: `${baseUrl}/img/favicon/apple-touch-icon-152x152.png`},
                {rel: "apple-touch-icon", sizes: "180x180", type: "image/png", href: `${baseUrl}/img/favicon/apple-touch-icon-180x180.png`},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/iphone5_splash.png`, media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/iphone6_splash.png`, media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/iphoneplus_splash.png`, media: "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/iphonex_splash.png`, media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/iphonexr_splash.png`, media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/iphonexsmax_splash.png`, media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/ipad_splash.png`, media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/ipadpro1_splash.png`, media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/ipadpro3_splash.png`, media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"},
                {rel: "apple-touch-startup-image", href: `${baseUrl}/img/splashscreen/ipadpro2_splash.png`, media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"}
            ]
        };
    }
};
