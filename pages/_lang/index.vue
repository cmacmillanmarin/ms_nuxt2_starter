<!--
    pages/_lang/index.vue
-->

<template>
    <div class="p-index pageLayout">
        <p v-text="$t(lang)" />
    </div>
</template>

<script>

    import { mapState } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "index",
        mixins: [ LifecycleHooks ],
        head () {
            return {
                title: `BurundangaStudio NUXT | ${this.$t(this.lang)}`
            }
        },
        computed: {
            ...mapState({
                lang: state => state.lang.locale
            })
        },
        methods: {
            setInitValue() {

                console.log("Home: setInitValue()");
            },
            init() {

                console.log("Home: init()");
            },
            destroyListeners() {

                console.log("Home: destroyListeners()");
            }
        },
        transition: {

            css: false,
            appear: true,
            mode: "out-in",
            routeName: "",

            enter(el, done) {

                TweenMax.to(el.querySelector("p"), 1, { rotation: 360, opacity: 1, onComplete: done })
            },
            enterCancelled(el) { TweenMax.killTweensOf(el); },
            beforeEnter(el) { this.routeName = this.$route.name },
            leave(el, done) {

                this.routeName !== this.$route.name
                    ? TweenMax.to(el.querySelector("p"), 1, { rotation: -360, opacity: 0, onComplete: done })
                    : done();
            },
            leaveCancelled(el) { TweenMax.killTweensOf(el) },
        }
    }

</script>

<style lang="scss" scoped>

    .p-index {
        p {
            display: inline-block;
            opacity: 0;
            will-change: opacity, transform;
            transform-origin: center;
        }
    }

</style>
