//
// Pinch.js

export default class Pinch {
    constructor(opts) {
        this.id = opts.id || "pinch";
        this.target = opts.target || document;
        this.prevent = opts.prevent;
        this.callback = opts.callback || function(pinch) {
            console.log(pinch);
        };
        this.onPinchTouchStartHandler = this.handleTouchStart.bind(this);
        this.onPinchTouchMovementHandler = this.handleTouchMove.bind(this);
        this.onPinchTouchEndHandler = this.handleTouchEnd.bind(this);

        this.pointerCache = [];
        this.prevDiff = -1;
    }

    init() {
        this.addListeners();
    }

    destroy() {
        this.removeListeners();
    }

    addListeners() {
        this.target.addEventListener("pointerdown", this.onPinchTouchStartHandler);
        this.target.addEventListener("pointermove", this.onPinchTouchMovementHandler);
        this.target.addEventListener("pointerup", this.onPinchTouchEndHandler);
        this.target.addEventListener("pointercancel", this.onPinchTouchEndHandler);
        this.target.addEventListener("pointerout", this.onPinchTouchEndHandler);
        this.target.addEventListener("pointerleave", this.onPinchTouchEndHandler);
    }

    removeListeners() {
        this.target.removeEventListener("pointerdown", this.onPinchTouchStartHandler);
        this.target.removeEventListener("pointermove", this.onPinchTouchMovementHandler);
        this.target.removeEventListener("pointerup", this.onPinchTouchEndHandler);
        this.target.removeEventListener("pointercancel", this.onPinchTouchEndHandler);
        this.target.removeEventListener("pointerout", this.onPinchTouchEndHandler);
        this.target.removeEventListener("pointerleave", this.onPinchTouchEndHandler);
    }

    handleTouchStart(e) {
        if (this.prevent) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.pointerCache.push(e);
    }

    handleTouchMove(e) {
        if (this.prevent) {
            e.preventDefault();
            e.stopPropagation();
        }

        for (let i = 0; i < this.pointerCache.length; i++) {
            if (e.pointerId === this.pointerCache[i].pointerId) {
                this.pointerCache[i] = e;
                break;
            }
        }

        if (this.pointerCache.length === 2) {
            const pinch = {id: this.id};

            // Calculate the distance between the two pointers
            const xDiff = this.pointerCache[0].clientX - this.pointerCache[1].clientX;
            const yDiff = this.pointerCache[0].clientY - this.pointerCache[1].clientY;
            const curDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

            if (this.prevDiff > 0) {
                if (curDiff > this.prevDiff) {
                // The distance between the two pointers has increased
                    pinch.diff = Math.min(0.5, (curDiff - this.prevDiff));
                    this.callback(pinch);
                }
                if (curDiff < this.prevDiff) {
                    // The distance between the two pointers has decreased
                    pinch.diff = Math.max(-0.5, (curDiff - this.prevDiff));
                    this.callback(pinch);
                }
            }
            // Cache the distance for the next move event
            this.prevDiff = curDiff;
        }
    }

    handleTouchEnd(e) {
        if (this.prevent) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.removeEvents(e);
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
