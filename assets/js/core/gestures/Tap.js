//
// Tap.js

export default class Tap {
    constructor(opts) {
        this.id = opts.id || "tap";
        this.target = opts.target || document;
        this.prevent = opts.prevent;
        this.callback = opts.callback || function(tap) {
            console.log(tap);
        };

        this.onTouchStartHandler = this.handleTouchStart.bind(this);
        this.onTouchEndHandler = this.handleTouchEnd.bind(this);

        this.tapTimeout = null;
        this.tapTimeoutTime = 200;
        this._lastTap = 0;
        this.pointerCache = [];
    }

    init() {
        this.addListeners();
    }

    destroy() {
        this.removeListeners();
    }

    addListeners() {
        this.target.addEventListener("pointerdown", this.onTouchStartHandler);
        this.target.addEventListener("pointerup", this.onTouchEndHandler);
    }

    removeListeners() {
        this.target.removeEventListener("pointerdown", this.onTouchStartHandler);
        this.target.removeEventListener("pointerup", this.onTouchEndHandler);
    }

    handleTouchStart(e) {
        if (this.prevent) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.pointerCache.push(e);
    }

    handleTouchEnd(e) {
        if (this.prevent) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.removeEvents(e);

        if (this.pointerCache.length > 1) return;

        const tap = {id: this.id};

        const currentTime = new Date().getTime();
        const tapLength = currentTime - this._lastTap;

        clearTimeout(this.tapTimeout);
        if (tapLength < this.tapTimeoutTime && tapLength > 100) {
            tap.doubleTap = true;
            this.callback(tap);
        } else {
            tap.singleTap = true;
            this.callback(tap);
            this.tapTimeout = setTimeout(()=>{
                // double tap cancelled event...
                clearTimeout(this.tapTimeout);
            }, this.tapTimeoutTime);
        }
        this._lastTap = tap.doubleTap ? 0 : currentTime;
    }

    removeEvents(e) {
        for (let i = 0; i < this.pointerCache.length; i++) {
            if (this.pointerCache[i].pointerId === e.pointerId) {
                this.pointerCache.splice(i, 1);
                break;
            }
        }
    }
}
