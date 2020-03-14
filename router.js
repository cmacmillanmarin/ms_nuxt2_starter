//
// Router.js

import Vue from "vue";
import Router from "vue-router";
import {interopDefault} from "./.nuxt/utils";

const Home = ()=>interopDefault(import("~/pages/home.vue" /* webpackChunkName "pages/home" */));
const Param = ()=>interopDefault(import("~/pages/param.vue" /* webpackChunkName "pages/param" */));

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
                name: "param",
                path: `${routes.param}/:slug`,
                component: Param
            }
        ]
    };
    return new Router(router);
}
