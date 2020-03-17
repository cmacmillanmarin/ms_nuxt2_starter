<!--
    pages/home.vue
-->

<template>
    <section class="page home below-header">
        <in-grid>
            <div class="grid">
                <div v-for="(img, i) in page.images" :key="i" :class="[`col-${cols}`]">
                    <an-image :data="$core.content.assets[img]" />
                </div>
                <div v-for="i in 6" :key="`content-${i}`" class="col-12 content">
                    <div>
                        <p v-text="`content ${i}`" />
                    </div>
                </div>   
            </div>
        </in-grid>
    </section>
</template>

<script>

import Head from "~/mixins/Head";
import Transitions from "~/mixins/Transitions";
import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

import InGrid from "~/components/InGrid";
import AnImage from "~/components/Image";

export default {
    name: "Home",
    components: {
        AnImage,
        InGrid
    },
    mixins: [Head, LifecycleHooks, Transitions, ResponsiveTemplate],
    computed: {
        cols() {
            return this.isMobileTemplate ? 12 : 6;
        }
    },
    asyncData({$core}) {
        return {
            page: $core.content.pages.home
        };
    },
    methods: {
        setInitValue() {},
        init() {},
        addListeners() {},
        removeListeners() {}
    }
};

</script>

<style lang="scss">

    .home {
        text-align: center;
        .content {
            position: relative;
            height: 50vh;
            div {
                border-top: 1px solid lightgray;
            }
            p {
                position: absolute;
                @include centerXY();
            }
        }
    }

</style>
