<!--
    components/ADAButton.vue
-->

<template>
    <button class="ada-button" type="button">
        <span class="ada-button__content" tabindex="-1">
            <slot />
        </span>
    </button>
</template>

<script>
export default {
    name: "ADAButton"
};
</script>

<style lang="scss">
    .ada-button {
        cursor: pointer;
        border: none;
        background: transparent;
        padding: 0;
        outline: none;
        &__content:focus {
            outline: none;
        }
        &:focus {
            outline: 1px solid blue;
        }
        &.border:focus {
            outline: none;
            border: 1px solid blue !important;
        }
    }
</style>
