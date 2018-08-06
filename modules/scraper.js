//
// modules/scraper.js

const fs = require("fs-extra");
const axios = require("axios");
const manifest = require("../config/manifest");

module.exports = function scraper() {

    const writeData = (path, data) => {
        return new Promise((resolve, reject) => {
            try {
                fs.ensureFileSync(path);
                fs.writeJson(path, data, resolve(`${path} Write Successful`));
            } catch (e) {
                console.error(`${path} Write Failed. ${e}`);
                reject(`${path} Write Failed. ${e}`);
            }
        })
    }

    const getData = async (builder) => {

        fs.emptyDir('static/data');

        const scraper = [];

        for (let staticData of manifest.staticDataCalls) {
            const path = `static/data/${staticData.path}`;
            const req = await axios.get(`${staticData.call}`);
            if (!fs.pathExistsSync(path)) fs.emptyDir(path);
            console.log(`${path}/${staticData.name}.json`);
            scraper.push(writeData(`${path}/${staticData.name}.json`, { content: req.data.result }));
        }

        return Promise.all(scraper).then(() => { console.log('JSON Build Complete!') });
    }
    if (process.env.NODE_ENV === 'dev') getData();
    this.nuxt.hook("generate:before", getData);
}
