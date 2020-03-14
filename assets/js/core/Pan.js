//
// Swipe.js

export default class Pan {
    constructor(opts) {
        this.id = opts.id || "pan";
        this.xDown = null;
        this.yDown = null;
        this.x = 0;
        this.y = 0;
        this.oldX = [];
        this.oldY = [];
        this.xDir = 0;
        this.yDir = 0;
        this.xDiff = 0;
        this.yDiff = 0;
        this.xVel = 0;
        this.yVel = 0;
        this.time = 0;
        this.to = null;
        this.timer = 0;
        this.target = opts.target || document;
        this.prevent = opts.prevent;
        this.allowMultipleTouches = false;
        this.preventScroll = opts.preventScroll;
        this.preventUp = opts.preventUp;
        this.preventDown = opts.preventDown;
        this.preventLeft = opts.preventLeft;
        this.preventRight = opts.preventRight;
        this.callback = function(pan) {};
        this.onPanStart = opts.onPanStart || this.callback;
        this.onPanUpdate = opts.onPanUpdate || this.callback;
        this.onPanEnd = opts.onPanEnd || this.callback;
        this.onClick = opts.onClick || this.callback;
        this.eventPassive = Object.prototype.hasOwnProperty.call(opts, "eventPassive") ? opts.eventPassive : true;
        this.onTouchStartHandler = this.handleTouchStart.bind(this);
        this.onTouchMovementHandler = this.handleTouchMove.bind(this);
        this.onTouchEndHandler = this.handleTouchEnd.bind(this);
    }

    init() {
        this.addListeners();
    }

    destroy() {
        this.removeListeners();
    }

    addListeners() {
        this.target.addEventListener("touchstart", this.onTouchStartHandler);
        this.target.addEventListener("mousedown", this.onTouchStartHandler);
    }

    removeListeners() {
        this.target.removeEventListener("touchstart", this.onTouchStartHandler);
        this.target.removeEventListener("touchmove", this.onTouchMovementHandler);
        this.target.removeEventListener("touchend", this.onTouchEndHandler);

        this.target.removeEventListener("mousedown", this.onTouchStartHandler);
        this.target.removeEventListener("mousemove", this.onTouchMovementHandler);
        this.target.removeEventListener("mouseup", this.onTouchEndHandler);
    }

    addDragListeners() {
        document.addEventListener("touchmove", this.onTouchMovementHandler, {passive: this.eventPassive && !this.preventTouch()});
        document.addEventListener("touchend", this.onTouchEndHandler);
        document.addEventListener("mousemove", this.onTouchMovementHandler);
        document.addEventListener("mouseup", this.onTouchEndHandler);
    }

    removeDragListeners() {
        document.removeEventListener("touchmove", this.onTouchMovementHandler, {passive: this.eventPassive && !this.preventTouch()});
        document.removeEventListener("touchend", this.onTouchEndHandler);
        document.removeEventListener("mousemove", this.onTouchMovementHandler);
        document.removeEventListener("mouseup", this.onTouchEndHandler);
    }

    handleTouchStart(e) {
        if (this.preventTouch()) {
            e.preventDefault();
            e.stopPropagation();
        }
        const firstTouch = this.getTouches(e);
        this.xDown = firstTouch.clientX;
        this.yDown = firstTouch.clientY;
        this.x = firstTouch.clientX;
        this.y = firstTouch.clientY;
        this.oldX = [this.x];
        this.oldY = [this.y];
        this.xDiff = 0;
        this.yDiff = 0;
        this.onPanStart({id: this.id, x: this.xDown, y: this.yDown});
        this.checkVelocity();
        this.timer = Date.now();

        this.addDragListeners();
    }

    handleTouchEnd(e) {
        if (this.preventTouch()) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.to && clearTimeout(this.to);
        const time = Date.now() - this.timer;
        const {length} = this.oldY;
        const index = time - 25 && length > 1 ? length - 1 : length;
        this.xVel = (this.oldX[index] - this.x) / time;
        this.yVel = (this.oldY[index] - this.y) / time;
        this.onPanEnd({id: this.id, x: this.x, y: this.y, xDiff: this.xDiff, yDiff: this.yDiff, xVel: this.xVel, yVel: this.yVel, time});
        (Date.now() - this.timer) < 75 && (Math.abs(this.xDiff) < 5 && Math.abs(this.yDiff) < 5) && this.onClick(e);
        this.removeDragListeners();
    }

    handleTouchMove(e) {
        const touch = this.getTouches(e);

        if (e.touches && !this.allowMultipleTouches && e.touches.length > 1) return;

        const x = touch.clientX;
        const y = touch.clientY;

        this.xDir = x > this.x ? 1 : -1;
        this.yDir = y > this.y ? 1 : -1;

        if (this.preventTouch() || !this.isTouch(e)) {
            e.preventDefault();
            e.stopPropagation();
        }

        const xDiff = this.xDown - x;
        const yDiff = y - this.yDown;

        this.onPanUpdate({id: this.id, x, xDiff, y, yDiff, xDir: this.xDir, yDir: this.yDir, xVel: this.xVel, yVel: this.yVel, event: e});

        this.x = x;
        this.y = y;
        this.xDiff = xDiff;
        this.yDiff = yDiff;
    }

    checkVelocity() {
        this.time = Date.now();
        this.oldX.push(this.x);
        this.oldY.push(this.y);
        this.to = setTimeout(this.checkVelocity.bind(this), 50);
    }

    getTouches(e) {
        const touch = e.touches || (e.originalEvent && e.originalEvent.touches);
        return (touch) ? touch[0] : e;
    }

    preventTouch() {
        return (this.prevent ||
                (this.preventUp && this.yDir === 1) ||
                (this.preventDown && this.yDir === -1) ||
                (this.preventLeft && this.xDir === 1) ||
                (this.preventRight && this.xDir === -1));
    }

    isTouch(e) {
        const touch = e.touches || (e.originalEvent && e.originalEvent.touches);
        return !!(touch);
    }
}
