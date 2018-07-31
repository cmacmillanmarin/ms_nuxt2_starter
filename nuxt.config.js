//
// nuxt.config.js

const axios = require("axios");
const manifest = require("./config/manifest");

module.exports = {
    head: {
        title: "BurundangaStudio Nuxt Boilerplate",
        meta: [{
                charset: "utf-8"
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "BurundangaStudio",
                name: "BurundangaStudio",
                content: "BurundangaStudio Nuxt Boilerplate"
            },
        ],
        bodyAttrs: {
            class: "__body"
        },
        script: [
            // Preload JS files
            {
                src: ""
            }
        ],
        link: [
            // Preload CSS, Favicon, etc...
            {
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon.ico"
            },
            // { rel: "stylesheet", href: "" }
        ]
    },

    router: {
        base: process.env.NODE_ENV === "dev" ? "/" : "/folder/",
        middleware: "i18n"
    },

    loading: false,

    modules: [
        "nuxt-sass-resources-loader",
        "@nuxtjs/axios",
    ],

    sassResources: ["@/assets/css/style.scss"],

    css: ["~/assets/css/style.scss"],

    postcss: [
        require("autoprefixer")({
            browsers: ["last 2 versions", "ie >= 9", "Safari 8"],
        })
    ],

    plugins: [{
            src: "~/plugins/i18n.js",
            ssr: true
        },
        {
            src: "~/plugins/Breakpoints.js",
            ssr: false
        },
        {
            src: "~/plugins/Checks.js",
            ssr: false
        }
    ],

    serverMiddleware: ["~/middleware/server.js"],

    build: {
        vendor: [
            "lodash",
            "gsap",
            "babel-polyfill",
            "~/plugins/Polyfills.js"
        ],
        extend(config, {
            isDev,
            isClient
        }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
            }
        }
    },
    generate: {
        routes: function (callback) {
            let routes = [];
            manifest.routes.forEach(route => {
                manifest.langs.forEach(lang => {
                    routes.push({
                        route: `${lang}/${route}`
                    });
                });
            })
            if (!manifest.dynamicRoutes || manifest.dynamicRoutes.length === 0) callback(null, routes);
            else {
                manifest.dynamicRoutes.forEach((dynamicRoute, numCall) => {
                    axios.get(dynamicRoute.url).then((res) => {
                        Array.from(res.data.result).forEach((child, key) => {
                            manifest.langs.forEach(lang => {
                                routes.push({
                                    route: `${lang}/${dynamicRoute.path}/${key}`,
                                    payload: child
                                });
                            });
                        });
                        if (numCall === manifest.dynamicRoutes.length - 1) callback(null, routes);
                    });
                });
            }
        }
    }
};
