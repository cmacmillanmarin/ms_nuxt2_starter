<!--
    components/organisms/Header.vue
-->

<template>
    <header class="o-header">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell _2 _alignLeft">
                <nuxt-link :to="{ name: `lang`, params: { lang }}">
                    <atom-logo />
                </nuxt-link>
            </div>
            <div class="flexGrid__cell _2 _alignRight _end">
                <p v-text="`${$t('o-header:device')}: ${platform}`" />
                <p v-text="`WebGL: ${webGLSupported}`" />
                <molecule-list :data="data.molecules.list" />
            </div>
        </div>
    </header>
</template>

<script>

    const data = {
        molecules: {
            list: {
                atoms: {
                    buttons: [
                        { label: "p-about:name", anchor: "lang-about" },
                        { label: "p-events:name", anchor: "lang-events" }
                    ]
                }
            }
        }
    }

    import { mapState } from "vuex";

    import AtomLogo from "~/components/atoms/Logo";
    import MoleculeList from "~/components/molecules/List";

    export default {
        name: "Header",
        computed: {
            ...mapState({
                lang: state => state.lang.locale,
                breakpoint: state => state.breakpoints.breakpoint,
                platform: state => state.checks.platform,
                webGLSupported: state => state.checks.webGLSupported
            })
        },
        data() {
            return {
                data
            }
        },
        watch: {
            breakpoint() {
                console.log(`Breakpoint header listener! New breakpoint :: ${this.breakpoint}`);
            }
        },
        components: {
            AtomLogo,
            MoleculeList
        }
    }

</script>

<style lang="scss" scoped>

    .o-header {

        border-bottom: 1px solid;
        border-color: lime;
        padding: 20px;

        @include respond-to("mobile-landscape") {
            border-color: $lightGrey;
        }

        @include respond-to("tablet-portrait") {
            border-color: lime;
        }

        @include respond-to("desktop") {
            border-color: $lightGrey;
        }

        @include respond-to("desktop-medium") {
            border-color: lime;
        }

        @include respond-to("desktop-large") {
            border-color: $lightGrey;
        }

        .m-list {
            margin-top: 5px;
        }

        .a-logo {
            width: 45px;
        }

        p {
            font-size: 10px;
        }
    }

</style>
