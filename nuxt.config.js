//
// nuxt.config.js

const axios = require("axios");
const manifest = require("./config/manifest");

module.exports = {
    router: {
        base: process.env.NODE_ENV === "dev" ? "/" : "/nuxt_boilerplate/",
        middleware: "i18n"
    },

    loading: false,

    modules: [
        "~/modules/scraper",
        "@nuxtjs/axios",
    ],

    css: ["@/assets/css/style.scss"],

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
            "~/plugins/Polyfills.js",
            "~/assets/css/_abs.scss"
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
                    const data = require(dynamicRoute.file);
                    Array.from(data.content).forEach((child, key) => {
                        manifest.langs.forEach(lang => {
                            routes.push({
                                route: `${lang}/${dynamicRoute.route}/${key}`,
                                payload: child
                            });
                        });
                        if (numCall === manifest.dynamicRoutes.length - 1) callback(null, routes);
                    });
                });
            }
        }
    }
};
