export default function(src) {
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
}
