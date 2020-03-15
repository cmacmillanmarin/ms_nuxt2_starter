//
// Router.js

import Vue from "vue";
import Router from "vue-router";
import {interopDefault} from "./.nuxt/utils";

const Home = ()=>interopDefault(import("~/pages/home.vue" /* webpackChunkName "pages/home" */));
const Threejs = ()=>interopDefault(import("~/pages/threejs.vue" /* webpackChunkName "pages/threejs" */));
const WebGL = ()=>interopDefault(import("~/pages/webgl.vue" /* webpackChunkName "pages/webgl" */));
const Dynamic = ()=>interopDefault(import("~/pages/dynamic.vue" /* webpackChunkName "pages/dynamic" */));

const Content = require(`~/data/${process.env.lang}.json`);
const {routes} = Content.config;

Vue.use(Router);

export function createRouter() {
    const router = {
        mode: "history",
        base: decodeURI(process.env.routerBase),
        routes: [
            {
                name: "home",
                path: `${routes.home}`,
                component: Home
            },
            {
                name: "webgl",
                path: `${routes.webgl}`,
                component: WebGL
            },
            {
                name: "threejs",
                path: `${routes.threejs}`,
                component: Threejs
            },
            {
                name: "dynamic",
                path: `${routes.dynamic}/:slug`,
                component: Dynamic
            }
        ]
    };
    return new Router(router);
}
