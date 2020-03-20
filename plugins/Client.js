//
// plugins/Client.js

import LocomotiveScroll from "locomotive-scroll";
const Worker = require("~/assets/js/workers/loader.worker.js");

export default ({store, $core}, inject)=>{
    store.dispatch("init");
    $core.loader.set(Worker);
    inject("scroll", LocomotiveScroll);
};
