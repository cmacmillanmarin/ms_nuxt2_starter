//
// assets/js/core/Index.js

import Events from "./Events";
import Loader from "./Loader";
import Swipe from "./gestures/Swipe";
import Pinch from "./gestures/Pinch";
import Tap from "./gestures/Tap";
import Pan from "./gestures/Pan";
import Tween from "./Tween";
import Ease from "./Ease";
import Utils from "./Utils";
import * as WebGL from "./webgl/index";

export default class Core {
    constructor(Content) {
        this.content = Content;
        this.loader = Loader;
        this.swipe = Swipe;
        this.pinch = Pinch;
        this.tap = Tap;
        this.pan = Pan;
        this.events = new Events();
        this.tween = Tween;
        this.ease = Ease;
        this.utils = Utils;
        this.webgl = WebGL;
        process.browser && this.mount();
    }

    mount() {
        // Init
        console.log("%c👻 @cmacmillanmarin", "background: black; color: white; padding: 10px 20px");
        requestAnimationFrame(this.raf.bind(this));
    }

    raf(now) {
        this.events.dispatchEvent(this.events.RAF, {params: {now}});
        requestAnimationFrame(this.raf.bind(this));
    }

    onWheel(e) {
        const y = e.deltaY;
        const x = e.deltaX;
        (x !== undefined || y !== undefined) && this.events.dispatchEvent(this.events.WHEEL, {params: {x, y, event: e}});
    }

    removeListeners() {
        window.removeEventListener("mousewheel", this.onWheelHandler, {passive: false});
    }
};
