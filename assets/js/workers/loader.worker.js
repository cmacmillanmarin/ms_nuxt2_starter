//
// assets/js/workers/file.worker.js

import fetch from "node-fetch";

self.addEventListener("message", async event =>{
    const {data} = event;
    switch (data.type) {
        case "library":
            console.log("Load Library ->", data.src);
            self.postMessage({src: data.src});
            break;
        case "img":
            const {src} = event.data;
            const response = await fetch(src);
            const blob = await response.blob();
            const _src = URL.createObjectURL(blob)
            self.postMessage({src: _src});
            break;
        default:
            self.postMessage("Type not found!");
            break;
    }
});
