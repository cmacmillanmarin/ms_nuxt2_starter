//
// store/scroll.js

export const state = ()=>({
    active: false,
    point: 0,
    direction: 1,
    progress: 0,
    onTop: false,
    onBottom: false,
    vertical: undefined,
    size: {active: 0, w: 0, h: 0},
    screen: {w: 0, h: 0},
    update: false,
    scrollTo: 0,
    verticalScroll: "v",
    horizontalScroll: "h"
});

export const mutations = {
    setActive(state, value) {
        state.active = value;
    },
    setPoint(state, point) {
        state.point = point;
        state.progress = Math.min(1, (state.vertical ? (state.point / (state.size.h - state.screen.h)) : (state.point / (state.size.w - state.screen.w)))).toFixed(3);
        state.onTop = parseFloat(state.progress) === 0.0;
        state.onBottom = parseFloat(state.progress) === 1.0;
    },
    updateScrollTo(state, point) {
        state.scrollTo = point;
    },
    setDirection(state, direction) {
        state.direction = direction;
    },
    setScrollDirection(state, value) {
        state.vertical = value === state.verticalScroll;
    },
    setHeight(state, size) {
        state.size.w = size.w;
        state.size.h = size.h;
        state.screen.w = size.screenW;
        state.screen.h = size.screenH;
        state.size.active = state.vertical ? state.size.h : state.size.w;
    },
    updateScroll(state) {
        state.update = !state.update;
    }
};
