//
// assets/js/core/Loader.js
export default class Loader {
    constructor() {    
        this.worker = null;
    }
    set(worker) {
        this.worker = worker;
    }
    new() {
        return new this.worker();
    }
};
