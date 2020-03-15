<!--
    components/Grid.vue
-->

<template>
    <div class="grid-debug">
        <div class="in-view-layout">
            <div class="in-grid-layout">
                <div class="grid">
                    <div v-for="i in 12" :key="i" class="col-1">
                        <div class="pink" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Grid"
};

</script>

<style lang="scss">

    .grid-debug {
        pointer-events: none;
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 999;
        .in-view-layout {
            height: 100%;
            > * {
                outline: 1px solid rgba(0, 0, 0, 0.05);
            }
        }
        .in-grid-layout {
            height: 100%;
            > div {
                outline: 0;
            }
            > * {
                outline: 1px solid rgba(0, 0, 0, 0.05);
            }
        }
        .grid{
            height: 100%;
            > div {
                height: 100%;
                .pink {
                    height: 100%;
                    background: rgba(0, 0, 0, 0.05);
                }
            }
        }
    }

</style>
