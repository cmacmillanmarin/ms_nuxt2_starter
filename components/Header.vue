<!--
    components/Header.vue
-->

<template>
    <header>
        <in-grid>
            <nav ref="nav" class="primary">
                <ul>
                    <li v-for="(link, i) in links" :key="i">
                        <ada-link :to="link.route">
                            {{ link.label }}
                        </ada-link>
                    </li>
                    <li>
                        <ada-button>
                            Button
                        </ada-button>
                    </li>
                </ul>
            </nav>
        </in-grid>
    </header>
</template>

<script>

import AdaLink from "~/components/ADALink";
import AdaButton from "~/components/ADAButton";
import InGrid from "~/components/InGrid";

import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

export default {
    name: "Header",
    components: {
        AdaLink,
        AdaButton,
        InGrid
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
        font-size: 14px;
        z-index: 9;
    }

</style>
