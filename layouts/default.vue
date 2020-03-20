<!--
    layouts/default.vue
-->

<template>
    <div data-scroll-container>
        <the-header />
        <nuxt />
        <the-footer />
        <debug-grid />
    </div>
</template>

<script>

import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

import TheHeader from "~/components/Header";
import TheFooter from "~/components/Footer";
import DebugGrid from "~/components/DebugGrid";

export default {
    name: "Default",
    components: {
        TheHeader,
        TheFooter,
        DebugGrid
    },
    mixins: [LifecycleHooks, ResponsiveTemplate],
    methods: {
        init() {
            this.scroll = new this.$scroll({
                el: this.$el,
                smooth: true
            });
        },
        onScroll(e) {
            console.log(e);
        },
        enter() {},
        entered() {
            this.scroll.update();
            this.scroll.start();
        },
        leave() {},
        reset() {
            this.scroll.scrollTo("top");
            this.scroll.stop();
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
        }
    }
};

</script>
