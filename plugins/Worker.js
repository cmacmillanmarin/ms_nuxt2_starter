//
// plugins/Worker.js

import Worker from "~/assets/js/workers/loader.worker.js";

export default ({$core}) => {
    $core.loader.set(Worker);
};
