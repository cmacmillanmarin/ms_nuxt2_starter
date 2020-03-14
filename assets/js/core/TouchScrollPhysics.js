function defined() {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

class Integration {
    constructor(opt) {
        this.opt = opt || {};

        this.value = 0;
        this.normalizeValue = 0;
        this.index = 0;

        this.totalCells = defined(this.opt.totalCells, 1);
        this.duration = defined(this.opt.duration, 1200);
        this.easing = defined(this.opt.easing, "o3");

        this.updateSize({
            viewSize: this.opt.viewSize || 0,
            cellSize: defined(this.opt.cellSize, 0),
            gutterSize: defined(this.opt.gutterSize, this.viewSize / 4)
        });

        this.inputDelta = 0;
        this.lastInput = 0;
        this.interacting = false;

        this.tween = this.opt.tween;
        this.startTime = 0;
        this.dir = 0;

        this.isTweening = false;
        this.callback = this.opt.callback || null;
        this.callbackEnd = this.opt.callbackEnd || null;
    }

    update() {
        if (!this.interacting) {
            this.clampValues();
            if (this.callback) this.callback();
            return;
        }
        const isBefore = this.value < 0;
        const isAfter = this.value > this.max;

        if (isBefore) {
            if (this.inputDelta > 0) {
                this.inputDelta *= 1 - (this.value / -this.gutterSize);
                this.inputDelta = (Number.isFinite(this.inputDelta)) ? this.inputDelta : 0;
            }
        } else if (isAfter) {
            if (this.inputDelta < 0) {
                this.inputDelta *= (this.maxGutter - this.value) / this.gutterSize;
                this.inputDelta = (Number.isFinite(this.inputDelta)) ? this.inputDelta : 0;
            }
        }

        this.value -= this.inputDelta;
        this.inputDelta = 0;

        this.clampValues();
        if (this.callback) this.callback();
    }

    clampValues() {
        this.normalizeValue = this.value / this.max;
        this.index = Math.round(this.value / this.viewSize);
        this.normalizeStep = (this.value / this.viewSize) % 1;
    }

    start(value) {
        this.inputDelta = 0;
        this.lastInput = value;
        this.startTime = Date.now();
        this.update();
    }

    move(value, dir) {
        if (this.interacting) {
            this.inputDelta = value - this.lastInput;
            this.lastInput = value;
        }
        this.tween.remove(this);
        this.interacting = true;
        this.dir = dir;
        this.update();
    }

    updateSize({viewSize, cellSize, gutterSize}) {
        this.viewSize = viewSize;
        this.cellSize = cellSize;
        this.gutterSize = gutterSize;
        this.fullSize = Math.max(viewSize, cellSize * this.totalCells);
        this.max = this.fullSize - viewSize;
        this.maxGutter = this.max + gutterSize;
        this.value = Math.min(this.index, this.totalCells - 1) * this.cellSize;
        this.update();
    }

    goTo(index) {
        const value = Math.min(index, this.totalCells - 1) * this.cellSize;
        this.animate(value);
    }

    end(isSwipe = false) {
        if (this.interacting) {
            this.interacting = false;
            const resistance = (this.dir > 0) ? this.normalizeStep < 0.5 : this.normalizeStep > 0.5;
            // window.navigator.vibrate(10);

            const nextStep = Math.min(this.index + ((isSwipe && resistance) ? 1 : 0), this.totalCells - 1) * this.cellSize;
            const prevStep = Math.max(this.index - ((isSwipe && resistance) ? 1 : 0), 0) * this.cellSize;
            const forward = (resistance || isSwipe) ? nextStep : prevStep;
            const backward = (resistance || isSwipe) ? prevStep : nextStep;
            const value = (this.dir > 0) ? forward : backward;
            this.animate(value);
        }
    }

    animate(value) {
        this.tween({
            targets: this,
            value,
            easing: this.easing,
            duration: this.duration,
            update: ()=>{
                this.update();
                if (this.callback) this.callback();
            },
            complete: ()=>{
                if (this.callbackEnd) this.callbackEnd();
            }
        });
    }

    destroy() {
        this.tween.remove(this);
        this.tween = null;
        this.callback = null;
    }
}

export default Integration;
