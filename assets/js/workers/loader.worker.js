//
// assets/js/workers/file.worker.js

import fetch from "node-fetch";

self.addEventListener("message", async event =>{
    const {data} = event;
    switch (data.type) {
        case "library":
            const res = await fetch(data.src);
            const {ok} = res;
            self.postMessage({ok});
            break;
        case "img":
            const {src} = event.data;
            const response = await fetch(src);
            const blob = await response.blob();
            const _src = URL.createObjectURL(blob);
            self.postMessage({src: _src});
            break;
        default:
            self.postMessage("Type not found!");
            self.close();
            break;
    }
});
