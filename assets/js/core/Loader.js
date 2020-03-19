/* eslint-disable */
//
// assets/js/core/Loader.js

export default class WorkerLoader {
    constructor() {
        this.cores = 8;
        this.pile = [];
        this.requests = [];
    }
    
    set(Worker) {
        for (let i = 0; i <= this.cores; i++) {
            const index = i;
            const ready = true;
            const worker = new Worker();
            worker.addEventListener("message", this.workerReady.bind(this));
            this.pile.push({index, ready, worker});
        }
    }

    get() {
        return new Promise(async(resolve)=>{
            for (const loader of this.pile) {
                if (loader.ready) {
                    loader.ready = false;
                    return resolve(loader);
                };
            }
            this.requests.push(resolve);
        });
    }

    workerReady(event) {
        const {index} = event.data;
        const self = this.pile[index];
        if (this.requests.length === 0) {
            self.ready = true;
        } else {
            const resolve = this.requests[0];
            this.requests.shift();
            resolve(self);
        }
    }

    clean() {
        this.requests = [];
    }
};
