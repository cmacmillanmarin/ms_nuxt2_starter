<!--
    components/Header.vue
-->

<template>
    <header>
        <in-grid>
            <nav ref="nav" class="primary grid">
                <section class="col-6">
                    <ada-link :to="{name:'home'}">
                        <logo />
                    </ada-link>
                </section>
                <section class="col-6">
                    <ul>
                        <li v-for="(link, i) in links" :key="i">
                            <ada-link :to="link.route">
                                {{ link.label }}
                            </ada-link>
                        </li>
                    </ul>
                </section>
            </nav>
        </in-grid>
    </header>
</template>

<script>

import Logo from "~/components/Logo";
import AdaLink from "~/components/ADALink";
import InGrid from "~/components/InGrid";

import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

export default {
    name: "Header",
    components: {
        AdaLink,
        InGrid,
        Logo
    },
    mixins: [LifecycleHooks, ResponsiveTemplate],
    computed: {
        links() {
            return this.$core.content.header.links;
        }
    }
};

</script>

<style lang="scss">

    header {
        position: fixed;
        width: 100%;
        z-index: 10;
        padding: 11px 10px 5px;
        @include for-breakpoint("tablet") {
            padding: 11px 0px 5px;
        }
        @include for-breakpoint("desktop-s") {
            padding: 26px 0px 20px;
        }
        nav {
            align-items: center;
        }
        ul {
            margin-top: 2px;
            text-align: right;
            white-space: nowrap;
        }
        li {
            display: inline-block;
            margin-left: 10px;
        }
    }

</style>
