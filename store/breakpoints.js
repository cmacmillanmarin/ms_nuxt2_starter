//
// store/breakpoints.js

export const state = () => ({
    breakpoint: "",
    prevBreakpoint: "",
    _debounce: null,
    _DEBOUNCE_DELAY: 50
})

export const mutations = {

    setBreakpoint(state, breakpoint) {
        state.breakpoint = breakpoint;
        state.prevBreakpoint = breakpoint;
    },

    setDebounce(state, debounce) {
        state._debounce = debounce;
    }
}

export const actions = {

    init({ state, commit, dispatch }) {

        console.log("Breakpoints :: init");

        commit("setDebounce",
            _.debounce(() => {
                dispatch("_updateBreakpoint");
            }, state._DEBOUNCE_DELAY)
        );

        dispatch("startWatching");
    },

    startWatching({ state, dispatch }){

        console.log("Breakpoints :: start watching");

        dispatch("stopWatching");
        window.addEventListener("resize", state._debounce );
        state._debounce();
    },

    stopWatching({ state }){
        if(state._debounce){
            state._debounce.cancel();
        }
        window.removeEventListener("resize", state._debounce );
    },

    _updateBreakpoint({ state, commit }) {

        let breakpoint = window.getComputedStyle(document.body, "::after").getPropertyValue("content");

        if(!_.isUndefined(breakpoint) && !_.isNull(breakpoint)){
            breakpoint = breakpoint.replace(/["']/g, "");
        }

        if(state.prevBreakpoint !== breakpoint){
            commit("setBreakpoint", breakpoint);
            console.log("Breakpoints :: updateBreakpoint", breakpoint);
        }
    }
}
