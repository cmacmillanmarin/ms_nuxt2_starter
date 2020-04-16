<!--
    layouts/default.vue
-->

<template>
    <div data-scroll-container>
        <the-header />
        <nuxt />
        <!-- <debug-grid /> -->
    </div>
</template>

<script>

import {mapState, mapMutations} from "vuex";

import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

import TheHeader from "~/components/Header";
import DebugGrid from "~/components/DebugGrid";

export default {
    name: "Default",
    components: {
        TheHeader,
        DebugGrid
    },
    mixins: [LifecycleHooks, ResponsiveTemplate],
    computed: {
        ...mapState({
            scrollPoint: state=>state.scroll.point,
            scrollEnabled: state=>state.scroll.enabled
        })
    },
    watch: {
        scrollEnabled() {
            this.scrollEnabled ? this.scroll.start() : this.scroll.stop();
            this.scroll.update();
        }
    },
    methods: {
        init() {
            this.scroll = new this.$scroll({
                el: this.$el,
                smooth: true,
                getDirection: true
            });
            this.scroll.stop();
        },
        onScroll(e) {
            const {scroll, limit, direction} = e;
            const {y} = scroll;
            this.updateScroll({y, limit, direction});
        },
        enter() {},
        entered() {},
        leave() {},
        reset() {
            this.setScrollEnabled(false);
            this.$core.loader.clean();
        },
        addListeners() {
            this.enterHandler = this.enter.bind(this);
            this.enteredHandler = this.entered.bind(this);
            this.leaveHandler = this.leave.bind(this);
            this.resetHandler = this.reset.bind(this);
            this.onScrollHandler = this.onScroll.bind(this);
            this.$core.events.addEventListener(this.$core.events.TRANSITION_ENTER, this.enterHandler);
            this.$core.events.addEventListener(this.$core.events.TRANSITION_ENTER_DONE, this.enteredHandler);
            this.$core.events.addEventListener(this.$core.events.TRANSITION_LEAVE, this.leaveHandler);
            this.$core.events.addEventListener(this.$core.events.TRANSITION_LEAVE_DONE, this.resetHandler);
            this.scroll.on("scroll", this.onScrollHandler);
        },
        removeListeners() {
            this.$core.events.removeEventListener(this.$core.events.TRANSITION_ENTER, this.enterHandler);
            this.$core.events.removeEventListener(this.$core.events.TRANSITION_ENTER_DONE, this.enteredHandler);
            this.$core.events.removeEventListener(this.$core.events.TRANSITION_LEAVE, this.leaveHandler);
            this.$core.events.removeEventListener(this.$core.events.TRANSITION_LEAVE_DONE, this.resetHandler);
            this.$core.removeListeners();
            this.scroll.off("scroll", this.onScrollHandler);
            this.scroll.destroy();
        },
        ...mapMutations({
            updateScroll: "scroll/updateScroll",
            setScrollEnabled: "scroll/setEnabled"
        })
    }
};

</script>
