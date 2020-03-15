//
// assets/js/core/Loader.js

import Worker from "../workers/file.worker.js";

export default class Loader {
    constructor() {
        const worker = new Worker();
        worker.postMessage({a: 1});
        worker.addEventListener("message", (event)=>{
            console.log("Main thread!", event);
        });
    }
};

// export const assets = (assets)=>{
//     return new Promise(async(resolve)=>{
//         if (!process.browser) resolve(assets);
//         const _assets = [];
//         let assetsLoaded = 0;
//         for (const asset of assets) {
//             _assets.push(await loadAsset(asset));
//             assetsLoaded = assetsLoaded + 1;
//             if (assetsLoaded === assets.length) resolve(_assets);
//         }
//     });
// };

// export const asset = (asset)=>{
//     return new Promise((resolve)=>{
//         if (!process.browser) resolve(asset);
//         const image = new Image();
//         try {
//             image.src = asset;
//             image.decode()
//                 .then(()=>{ resolve(image); })
//                 .catch(()=>{ throw new Error(`Could not load/decode ${asset}.`); });
//         } catch (error) {
//             image.onload = ()=>{
//                 resolve(image);
//             };
//             image.src = asset;
//         }
//     });
// };

// export const library = (src)=>{
//     console.log("----->>>> loaaaad!", src);
//     return new Promise((resolve, reject)=>{
//         const script = document.createElement("script");
//         script.src = src;
//         script.async = false;
//         script.onload = (e)=>{
//             resolve();
//         };
//         script.onerror = (e)=>{
//             reject(new Error("Error loading library " + src));
//         };
//         document.head.appendChild(script);
//     });
// };

// export default {
//     assets,
//     asset,
//     library
// }
