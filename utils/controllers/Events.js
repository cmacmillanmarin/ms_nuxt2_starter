//
// utils/controllers/Events.js

import EventDispatcher from "~/utils/core/EventDispatcher.js";

export let EVENT_NAME_A = "event_key_a";
export let EVENT_NAME_B = "event_key_b";

class DefaultEvents extends EventDispatcher {
    constructor() {
        super();
        console.log("Default Events :: init");
    }
}

const _Events = new DefaultEvents();
export const Events = _Events;
