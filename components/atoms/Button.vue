<!--
    components/atoms/Button.vue
-->

<template>
    <nuxt-link class="a-button" :to="{ name: data.anchor, params: { lang }}" v-text="$t(data.label)" />
</template>

<script>

    const data = { label: "Button", anchor: "/" };

    import { mapState } from "vuex";

    export default {
        name: "Button",
        computed: {
            ...mapState({
                lang: state => state.lang.locale
            })
        },
        props: {
            data: {
                type: Object,
                default: () => data
            }
        }
    }

</script>

<style lang="scss" scoped>

    .a-button {
        background: none;
        @include respond-to("mobile-landscape") {
            font-size: 12px;
        }
    }

</style>
