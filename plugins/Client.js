//
// plugins/Client.js

const Worker = require("~/assets/js/workers/loader.worker.js");

export default ({store, $core})=>{
    store.dispatch("init");
    $core.loader.set(Worker);
};
