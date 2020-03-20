<!--
    pages/home.vue
-->

<template>
    <section class="page home below-header" data-scroll-section>
        <in-grid>
            <div class="grid">
                <div v-for="(img, i) in page.images" :key="i" :class="[`col-${cols}`]" data-scroll>
                    <an-image :data="$core.content.assets[img]" />
                </div>
                <div v-for="i in 6" :key="`content-${i}`" class="col-12 content" data-scroll>
                    <div>
                        <ada-button>Button {{i}}</ada-button>
                    </div>
                </div>   
            </div>
        </in-grid>
        <the-footer data-scroll />
    </section>
</template>

<script>

import {mapMutations} from "vuex";

import Head from "~/mixins/Head";
import Transitions from "~/mixins/Transitions";
import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

import InGrid from "~/components/InGrid";
import AnImage from "~/components/Image";
import AdaButton from "~/components/ADAButton";
import TheFooter from "~/components/Footer";

export default {
    name: "Home",
    components: {
        AnImage,
        InGrid,
        AdaButton,
        TheFooter
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
        entered() {
            this.setScrollEnabled(true);
        },
        addListeners() {
            this.enteredHandler = this.entered.bind(this);
            this.$core.events.addEventListener(this.$core.events.TRANSITION_ENTER_DONE, this.enteredHandler);
        },
        removeListeners() {
            this.$core.events.removeEventListener(this.$core.events.TRANSITION_ENTER_DONE, this.enteredHandler);
        },
        ...mapMutations({
            setScrollEnabled: "scroll/setEnabled"
        })
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
            button {
                font-size: 14px;
                position: absolute;
                @include centerXY();
            }
        }
    }

</style>
