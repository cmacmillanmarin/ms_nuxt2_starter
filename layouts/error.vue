<!--
    layouts/error.vue
-->

<template>
    <div class="l-error">
        <p>ERROR PAGE</p>
    </div>
</template>

<script>

import LifecycleHooks from "~/mixins/LifecycleHooks";

export default {
    mixins: [LifecycleHooks],
    props: {
        error: {
            type: Object,
            default: ()=>""
        }
    },
    methods: {
        setInitValue() {
            for (const i in this.error) {
                console.log(i + "--------" + this.error[i]);
            }
        }
    }
};
</script>

<style lang="scss">

    .l-error {
        text-align: center;
    }

</style>
