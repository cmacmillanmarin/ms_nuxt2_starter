<!--
    layouts/default.vue
-->

<template>
    <div class="__content">
        <the-header />
        <nuxt />
        <grid />
        <the-footer />
    </div>
</template>

<script>

import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

import Grid from "~/components/Grid";
import TheHeader from "~/components/Header";
import TheFooter from "~/components/Footer";

export default {
    name: "Default",
    components: {
        Grid,
        TheHeader,
        TheFooter
    },
    mixins: [LifecycleHooks, ResponsiveTemplate],
    methods: {
        init() {},
        enter() {},
        entered() {},
        leave() {},
        reset() {},
        addListeners() {
            this.enterHandler = this.enter.bind(this);
            this.enteredHandler = this.entered.bind(this);
            this.leaveHandler = this.leave.bind(this);
            this.resetHandler = this.reset.bind(this);
            this.$core.events.addEventListener(this.$core.events.TRANSITION_ENTER, this.enterHandler);
            this.$core.events.addEventListener(this.$core.events.TRANSITION_ENTER_DONE, this.enteredHandler);
            this.$core.events.addEventListener(this.$core.events.TRANSITION_LEAVE, this.leaveHandler);
            this.$core.events.addEventListener(this.$core.events.TRANSITION_LEAVE_DONE, this.resetHandler);
        },
        removeListeners() {
            this.$core.events.removeEventListener(this.$core.events.TRANSITION_ENTER, this.enterHandler);
            this.$core.events.removeEventListener(this.$core.events.TRANSITION_ENTER_DONE, this.enteredHandler);
            this.$core.events.removeEventListener(this.$core.events.TRANSITION_LEAVE, this.leaveHandler);
            this.$core.events.removeEventListener(this.$core.events.TRANSITION_LEAVE_DONE, this.resetHandler);
            this.$core.removeListeners();
        }
    }
};

</script>

<style lang="scss">

    .__content {
        width: 100%;
        height: 100%;
    }

</style>
