//
// store/scroll.js

export const state = ()=>({
    enabled: false,
    point: 0,
    direction: "",
    velocity: 0,
    progress: 0,
    onTop: false,
    onBottom: false
});

export const mutations = {
    setEnabled(state, value) {
        state.enabled = value;
    },
    updateScroll(state, {y, limit, direction}) {
        state.point = y;
        state.direction = direction;
        state.progress = y / limit;
        state.onTop = parseFloat(state.progress) === 0.0;
        state.onBottom = parseFloat(state.progress) === 1.0;
    }
};
