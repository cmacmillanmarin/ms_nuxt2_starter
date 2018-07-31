<!--
    components/atoms/Logo.vue
-->

<template>
    <div class="m-events">

        <div class="flexGrid _horizontal">
            <div ref="a" class="flexGrid__cell _1 _alignCenter">
                <p v-text="$t('m-events:utils:description')" />
            </div>
            <div ref="a" class="flexGrid__cell _2 _alignCenter">
                <p>Person A</p>
                <button @click="aTalks_B" v-text="$t('m-events:a:talks:b')" />
                <p v-if="messageA > 0" v-text="`${$t('m-events:a:listen:b')} ${messageA} ${$t('m-events:times')}`" />
            </div>
            <div ref="b" class="flexGrid__cell _2 _alignCenter">
                <p>Person B</p>
                <button @click="bTalks_A" v-text="$t('m-events:b:talks:a')" />
                <p v-if="messageB > 0" v-text="`${$t('m-events:b:listen:a')} ${messageB} ${$t('m-events:times')}`" />
            </div>
        </div>
    </div>
</template>

<script>

    import {
        EVENT_NAME_A,
        EVENT_NAME_B,
        Events
    }  from "~/utils/controllers/Events";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "events",
        mixins: [ LifecycleHooks ],
        data() {
            return {
                counterA: 1,
                counterB: 1,
                messageA: 0,
                messageB: 0
            }
        },
        methods: {
            setListeners() {

                this.setListenersA();
                this.setListenersB();
            },

            //
            // BurundangaStudioer A
            setListenersA() {
                Events.addEventListener(EVENT_NAME_B, this.aListen_B.bind(this));
            },
            aTalks_B() {
                Events.dispatchEvent(EVENT_NAME_A, { params: { counter: this.counterA++ }, target: this.$refs.a });
            },
            aListen_B({ params }) {
                this.messageA = params.counter;
            },

            //
            // BurundangaStudioer B
            setListenersB() {
                Events.addEventListener(EVENT_NAME_A, this.bListen_A.bind(this));
            },
            bTalks_A() {
                Events.dispatchEvent(EVENT_NAME_B, { params: { counter: this.counterB++, target: this.$refs.b }});
            },
            bListen_A({ params }) {
                this.messageB = params.counter;
            }
        }
    }

</script>

<style lang="scss" scoped>

    .m-events {
        .flexGrid {
            padding: 20px;
            &__cell {
                padding: 5px 0px;
            }
        }
    }

</style>
