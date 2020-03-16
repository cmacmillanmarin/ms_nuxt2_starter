//
// assets/js/workers/file.worker.js

self.addEventListener("message", async event =>{
    const {data} = event;
    switch (data.type) {
        case "library":
            console.log("Load Library ->", data.src);
            self.postMessage({src: data.src});
            // const THREE = await loadLibrary(data.src);
            // console.log("Load Library ->", THREE);
            self.postMessage(data);
            break;
        case "asset":
            console.log("Load Asset ->", data.asset);
            self.postMessage({asset: data.asset});
            // self.postMessage(await loadAsset(data.asset));
            break;
        case "assets":
            console.log("Load Assets ->", data.assets);
            self.postMessage({assets: data.assets});
            // self.postMessage(await loadAssets(data.assets));
            break;
        default:
            self.postMessage("Type not found!");
            break;
    }
});

export const loadAssets = (assets)=>{
    return new Promise(async(resolve)=>{
        if (!process.browser) resolve(assets);
        const _assets = [];
        let assetsLoaded = 0;
        for (const asset of assets) {
            _assets.push(await loadAsset(asset));
            assetsLoaded = assetsLoaded + 1;
            if (assetsLoaded === assets.length) resolve(_assets);
        }
    });
};

export const loadAsset = (asset)=>{
    return new Promise((resolve)=>{
        if (!process.browser) resolve(asset);
        const image = new Image();
        try {
            image.src = asset;
            image.decode()
                .then(()=>{ resolve(image); })
                .catch(()=>{ throw new Error(`Could not load/decode ${asset}.`); });
        } catch (error) {
            image.onload = ()=>{
                resolve(image);
            };
            image.src = asset;
        }
    });
};

export const loadLibrary = (src)=>{
    return new Promise((resolve, reject)=>{
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = (e)=>{
            resolve();
        };
        script.onerror = (e)=>{
            reject(new Error("Error loading library " + src));
        };
        document.head.appendChild(script);
    });
};
