<!--
    components/ADALink.vue
-->

<template>
    <nuxt-link :to="to" class="ada-link">
        <span class="ada-link__content" tabindex="-1">
            <slot />
        </span>
    </nuxt-link>
</template>

<script>
export default {
    name: "ADALink",
    props: {
        to: {
            type: [Object, String],
            default: ()=>{ return {}; }
        }
    }
};
</script>

<style lang="scss">
    .ada-link {
        cursor: pointer;
        border: none;
        background: transparent;
        padding: 0;
        outline: none;
        &__content:focus {
            outline: none;
        }
        &:focus {
            color: red;
        }
    }
</style>
