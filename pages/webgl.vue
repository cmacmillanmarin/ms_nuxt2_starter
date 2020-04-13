<!--
    pages/webgl.vue
-->

<template>
    <section class="page webgl">
        <nav>
            <ul>
                <li v-for="effect of page.effects" :key="effect.id">
                    <ada-button class="" @click.native="setAnimation(effect.id)">
                    {{ effect.label }}
                    </ada-button>
                </li>
            </ul>
        </nav>
        <web-g-l :image="$core.content.assets[page.images[0]]" :effects="effects" />
    </section>
</template>

<script>

import Head from "~/mixins/Head";
import Transitions from "~/mixins/Transitions";

import WebGL from "~/components/WebGL";
import AdaButton from "~/components/ADAButton";

export default {
    name: "Webgl",
    components: {
        WebGL,
        AdaButton
    },
    mixins: [Head, Transitions],
    asyncData({$core}) {
        return {
            page: $core.content.pages.webgl,
            effects: []
        };
    },
    methods: {
        setAnimation(id) {
            const index = this.effects.indexOf(id);
            index >= 0 ? this.effects.splice(index, 1) : this.effects.push(id);
        }
    }
};

</script>

<style lang="scss">
    .webgl {
        padding-top: $desktop_menu_height;
        nav {
            position: relative;
            z-index: 2;
            text-align: center;
        }
        li {
            display: inline-block;
            margin: 0px 10px;
        }
        .c-webgl {
            z-index: 1;
        }
    }
</style>