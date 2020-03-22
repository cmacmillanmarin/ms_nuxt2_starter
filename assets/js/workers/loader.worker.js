//
// assets/js/workers/file.worker.js

import fetch from "node-fetch";

self.addEventListener("message", async event =>{
    const {index, type, src} = event.data;
    switch (type) {
        case "library":
            const library = await fetch(src);
            self.postMessage({index, type, src, ok: library.ok});
            break;
        case "img":
            const img = await fetch(src);
            const {ok} = img;
            if (ok) {
                const blob = await img.blob();
                const _src = URL.createObjectURL(blob);
                self.postMessage({index, type, src: _src});
            } else {
                self.postMessage({index});
            }     
            break;
        default:
            self.postMessage({index});
            break;
    }
});
