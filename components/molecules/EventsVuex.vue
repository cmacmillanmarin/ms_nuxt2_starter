<!--
    components/atoms/Logo.vue
-->

<template>
    <div class="m-events-vuex">

        <div class="flexGrid _horizontal">
            <div ref="a" class="flexGrid__cell _1 _alignCenter">
                <p v-text="$t('m-events:vuex:description')" />
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

    import { mapState, mapMutations } from "vuex";

    export default {
        name: "eventsVuex",
        computed: {
            ...mapState({
                event_a: state => state.events.event_a,
                event_b: state => state.events.event_b
            })
        },
        data() {
            return {
                counterA: 1,
                counterB: 1,
                messageA: 0,
                messageB: 0
            }
        },
        watch: {
            event_a: {
                handler() {
                    this.messageB = this.event_a.params.counter
                },
                deep: true
            },
            event_b: {
                handler() {
                    this.messageA = this.event_b.params.counter
                },
                deep: true
            },
        },
        methods: {
            aTalks_B() {
                this.dispatch({ type: 'event_a', params: { counter: this.counterA++ }})
            },
            bTalks_A() {
                this.dispatch({ type: 'event_b', params: { counter: this.counterB++ }})
            },
            ...mapMutations({
                dispatch: "events/dispatch"
            })
        }
    }

</script>

<style lang="scss" scoped>

    .m-events-vuex {
        .flexGrid {
            padding: 20px;
            &__cell {
                padding: 5px 0px;
            }
        }
    }

</style>
