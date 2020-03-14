<!--
    components/Header.vue
-->

<template>
    <header>
        <div class="inViewLayout">
            <div class="inGridLayout">
                <nav ref="nav" class="primary">
                    <ul>
                        <li>
                            <ada-link>
                                Link
                            </ada-link>
                            <ada-button>
                                Button
                            </ada-button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>

import AdaLink from "~/components/ADALink";
import AdaButton from "~/components/ADAButton";

import LifecycleHooks from "~/mixins/LifecycleHooks";
import ResponsiveTemplate from "~/mixins/ResponsiveTemplate";

export default {
    name: "Header",
    components: {
        AdaLink,
        AdaButton
    },
    mixins: [LifecycleHooks, ResponsiveTemplate]
};

</script>

<style lang="scss">

    header {
        position: fixed;
        width: 100%;
        z-index: 10;
        font-size: 14px;
        z-index: 9;
        background: white;
    }

</style>
