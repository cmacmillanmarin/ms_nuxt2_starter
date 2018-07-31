<!--
    components/molecule/List.vue
-->

<template>
    <ul class="m-list">
        <li v-for="(button, i) in data.atoms.buttons" :key="i" class="item">
            <atom-button :data="button" class="button"/>
        </li>
    </ul>
</template>

<script>

    const data = {
        atoms: {
            buttons: [
                { label: "Button 1", anchor: "/" },
                { label: "Button 2", anchor: "/" },
                { label: "Button 3", anchor: "/" }
            ]
        }
    };

    import AtomButton from "~/components/atoms/Button";

    export default {
        name: "List",
        props: {
            data: {
                type: Object,
                default: () => data
            }
        },
        components: {
            AtomButton
        }
    }

</script>

<style lang="scss" scoped>

    .m-list {
        .item {
            display: inline-block;
            padding: 0 10px 0 0;
            &:last-child {
                padding: 0;
            }
            @include respond-to("mobile-landscape") {
                padding: 0 5px 0 0;
            }
        }
    }

</style>
