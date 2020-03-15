//
// assets/js/workers/file.worker.js

self.addEventListener("message", (event)=>{
    console.log("Eh qué pasa!");
    self.postMessage({
        lol: "lol"
    });
});
