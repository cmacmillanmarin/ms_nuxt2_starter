//
//  components/types/mixins/Transition.js

export default {
    transition: {

        css: false,
        appear: true,
        mode: "out-in",
        routeName: "",

        beforeLeave(el) {},
        leave(el, done) {

            this.routeName !== this.$route.name
                ? TweenMax.to(el, 0.25, { opacity: 0, onComplete: done })
                : done();
        },
        leaveCancelled(el) { TweenMax.killTweensOf(el); },
        afterLeave(el) {},

        beforeEnter(el) {
            this.routeName = this.$route.name
            TweenMax.set(el, { opacity: 0, willChange: "opacity" })
        },
        enter(el, done) {

            TweenMax.to(el, 1, { opacity: 1, onComplete: done })
        },
        enterCancelled(el) { TweenMax.killTweensOf(el); },
        afterEnter(el) {}

    }
}
