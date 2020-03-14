//
//  components/types/mixins/Transition.js

export default {
    transition: {
        css: false,
        mode: "out-in",
        appear: true,
        leave(el, done) {
            this.$core.events.dispatchEvent(this.$core.events.TRANSITION_LEAVE);
            this.$core.tween({
                targets: el,
                opacity: 0,
                easing: "o2",
                duration: 350,
                complete: ()=>{
                    done();
                    this.$core.events.dispatchEvent(this.$core.events.TRANSITION_LEAVE_DONE);
                }
            });
        },
        enter(el, done) {
            this.$core.events.dispatchEvent(this.$core.events.TRANSITION_ENTER);
            this.$core.tween({
                targets: el,
                opacity: 1,
                easing: "i2",
                duration: 350,
                complete: ()=>{
                    done();
                    this.$core.events.dispatchEvent(this.$core.events.TRANSITION_ENTER_DONE);
                }
            });
        }
    }
};
