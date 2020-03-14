//
// plugins/Core.js

import Core from "assets/js/core/Index";
const Content = require(`~/data/${process.env.lang}.json`);

export default (context, inject)=>{
    const _core = new Core(Content);
    context.$core = _core;
    inject("core", _core);
};
