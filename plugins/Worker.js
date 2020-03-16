//
// plugins/Worker.js

const Worker = require("~/assets/js/workers/loader.worker.js");

export default ({$core}) => {
    $core.loader.set(Worker);
};
