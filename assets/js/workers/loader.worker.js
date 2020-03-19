//
// assets/js/workers/file.worker.js

import fetch from "node-fetch";

self.addEventListener("message", async event =>{
    const {index, type, src} = event.data;
    switch (type) {
        case "library":
            const res = await fetch(src);
            self.postMessage({index, ok: res.ok});
            break;
        case "img":
            const response = await fetch(src);
            const {ok} = response;
            if (ok) {
                const blob = await response.blob();
                const _src = URL.createObjectURL(blob);
                self.postMessage({index, src: _src});
            } else {
                self.postMessage({index});
            }     
            break;
        default:
            self.postMessage({index});
            break;
    }
});
