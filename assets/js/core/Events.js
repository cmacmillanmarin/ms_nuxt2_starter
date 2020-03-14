//
// assets/js/core/Events.js

export default class Events {
    constructor() {
        this._listeners = {};
        this.RAF = "requestAnimationFrame";
        this.WHEEL = "WHEEL";
        this.TRANSITION_ENTER = "transition_enter";
        this.TRANSITION_LEAVE = "transition_leave";
        this.TRANSITION_ENTER_DONE = "transition_enter_done";
        this.TRANSITION_LEAVE_DONE = "transition_leave_done";
    }

    addEventListener(type, listener) {
        if (this._listeners[type] === undefined) this._listeners[type] = [];
        if (this._listeners[type].indexOf(listener) === -1) this._listeners[type].push(listener);
    }

    hasEventListener(type, listener) {
        return this._listeners[type] !== undefined && this._listeners[type].indexOf(listener) !== -1;
    }

    removeEventListener(type, listener) {
        const listenerArray = this._listeners[type];
        if (listenerArray !== undefined) {
            const index = listenerArray.indexOf(listener);
            if (index !== -1) listenerArray.splice(index, 1);
        }
    }

    dispatchEvent(event, data) {
        const params = data ? data.params : null;
        const target = data ? data.target : null;

        const listenerArray = this._listeners[event];
        if (listenerArray !== undefined) {
            const array = listenerArray.slice(0);
            for (let i = 0, l = array.length; i < l; i++) {
                array[i].call(this, {event, params, target});
            }
        }
    }
};
