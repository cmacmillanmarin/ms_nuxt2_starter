//
// assets/js/scripts/Images.js

const fs = require("fs");
const cmd = require("node-cmd");
const size = require("image-size");

const FILES = [];
const QUEQUE = [];
const OUT_PATH = "static/img/";
const JSON_PATH = "data/en.json";
const JSON_FILE = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
const SIZES = [
    2048,
    1024,
    512,
    256
];

let IN_PATH = "assets/img/";
let OUT_RELATIVE_PATH = "";

process.argv.forEach((val, index)=>{
    if (index === 2) {
        IN_PATH += val;
        OUT_RELATIVE_PATH += val;
    }
});

console.log(`Entry: ${IN_PATH}, Sizes: ${SIZES}`);
console.log("-------------------------------------------------");
console.log("Converting... \n");

if (!fs.existsSync(OUT_PATH)) { fs.mkdirSync(OUT_PATH); }

const cleanArray = (array)=>{
    const toClean = ["opt", ".DS_Store"];
    for (const clean of toClean) {
        const index = array.indexOf(clean);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    return array;
};

const createPathFor = (file)=>{
    let path = "";
    const parts = file.split("/");
    for (const part in parts) {
        if (part < parts.length - 1) {
            path += (parseInt(part) !== 0 ? "/" : "") + parts[part];
            if (!fs.existsSync(path)) { fs.mkdirSync(path); }
        }
    }
};

const cleanName = (name)=>{ return name.split(".")[0].replace(IN_PATH, "").toLowerCase(); };
const formatOf = (name)=>{ return name.split(".")[1].replace(IN_PATH, ""); };

const convert = (i = 0)=>{
    const task = QUEQUE[i];
    cmd.get(task, ()=>{
        console.log(`${task}`);
        if (i < QUEQUE.length - 1) {
            i++;
            convert(i);
        } else updateJson();
    });
};

const updateJson = ()=>{
    fs.writeFileSync(JSON_PATH, JSON.stringify(JSON_FILE, null, 2), {flag: "w"});
    console.log("\nAll converted!\n-------------------------------------------------\n");
};

const getFiles = (PATH)=>{
    if (fs.lstatSync(PATH).isDirectory()) {
        for (const file of cleanArray(fs.readdirSync(PATH))) {
            if (fs.existsSync(OUT_PATH) && fs.lstatSync(PATH + file).isDirectory()) getFiles(`${PATH + file}/`);
            else FILES.push(PATH + file);
        }
    } else {
        FILES.push(PATH);
    }
};

const getIdOf = (PATH)=>{
    return PATH.replace(/\//g, "-");
};

const gcd = (x, y)=>{
    if ((typeof x !== "number") || (typeof y !== "number")) return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        const t = y;
        y = x % y;
        x = t;
    }
    return x;
};

(()=>{
    getFiles(IN_PATH);
    for (const FILE of FILES) {
        const fileName = cleanName(FILE);
        const format = formatOf(FILE);
        const {width, height} = size(FILE);
        const _gdc = gcd(width, height);
        JSON_FILE.assets[getIdOf(`img-${fileName}`)] = {
            src: `${OUT_RELATIVE_PATH}${fileName}.${format}`,
            alt: fileName,
            ratio: `${width / _gdc}x${height / _gdc}`
        };
        JSON_FILE.assets[getIdOf(`img-${fileName}-webgl`)] = {
            src: `${OUT_RELATIVE_PATH}${fileName}-webgl.${format}`,
            alt: fileName,
            ratio: `${width / _gdc}x${height / _gdc}`
        };
        for (const SIZE of SIZES) {
            const outPath = `${OUT_PATH + SIZE}/${OUT_RELATIVE_PATH}${fileName}.${format}`;
            const outPathWebGL = `${OUT_PATH + SIZE}/${OUT_RELATIVE_PATH}${fileName}-webgl.${format}`;
            createPathFor(outPath);
            QUEQUE.push(`convert ${FILE} -resize ${SIZE} ${outPath}`);
            QUEQUE.push(`convert ${FILE} -resize ${SIZE}x${SIZE}\! ${outPathWebGL}`);
        }
    }
    convert();
})();
