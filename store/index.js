//
// store/device.js

import {detect} from "detect-browser";

const templates = {
    mobile: {
        id: "mobile",
        breakpoint: 0
    },
    tablet: {
        id: "tablet",
        breakpoint: 768
    },
    desktop: {
        id: "desktop",
        breakpoint: 992
    }
};

export const state = ()=>({
    specs: {
        os: "",
        name: "",
        version: "",
        mobile: false,
        desktop: false,
        ie: false,
        ios: false,
        android: false,
        platform: "",
        webGLSupported: false,
        devicePixelRatio: 1
    },
    breakpoint: "",
    templates,
    template: templates.desktop.id,
    resize: true,
    viewportSize: {w: 0, h: 0},
    _HANDLER: null
});

export const getters = {
    isMobileTemplate: (state)=>{
        return state.template === templates.mobile.id;
    },
    isTabletTemplate: (state)=>{
        return state.template === templates.tablet.id;
    },
    isDesktopTemplate: (state)=>{
        return state.template === templates.desktop.id;
    }
};

export const mutations = {

    setDevice(state, value) {
        state.specs = {...state.specs, ...value};
    },

    setValueFor(state, data) {
        state.specs[data.key] = data.value;
    },

    setBreakpoint(state, breakpoint) {
        state.breakpoint = breakpoint;
    },

    setHandler(state, handler) {
        state._HANDLER = handler;
    },

    setDevicePixelRatio(state, dpx) {
        state.specs.devicePixelRatio = dpx;
    },

    setViewport(state, {w, h}) {
        const {mobile, tablet, desktop} = templates;
        state.template = w < tablet.breakpoint ? mobile.id : (w < desktop.breakpoint) ? tablet.id : desktop.id;
        state.viewportSize.w = w;
        state.viewportSize.h = h;
        state.resize = !state.resize;
    }

};

export const actions = {

    init({commit, dispatch}) {
        const w = window.innerWidth || 0;
        const h = window.innerHeight || 0;

        commit("setViewport", {w, h});
        commit("setDevice", detect());
        commit("setHandler", (_)=>{ dispatch("_updateBreakpoint"); });

        dispatch("checkDevice");
        dispatch("checkWebGL");
        dispatch("startWatching");
    },

    startWatching({state}) {
        window.addEventListener("resize", state._HANDLER);
        window.addEventListener("orientationchange", state._HANDLER);
        state._HANDLER();
    },

    _updateBreakpoint({state, commit}) {
        let breakpoint = window.getComputedStyle(document.body, "::after").getPropertyValue("content");

        const w = window.innerWidth || 0;
        const h = window.innerHeight || 0;
        const dpr = Math.min(2, window.devicePixelRatio);
        commit("setViewport", {w, h});
        commit("setDevicePixelRatio", dpr);

        if (breakpoint) {
            breakpoint = breakpoint.replace(/["']/g, "");
        }

        if (state.breakpoint !== breakpoint) {
            commit("setBreakpoint", breakpoint);
        }
    },

    checkDevice({state, commit}) {
        commit("setValueFor", {key: "ios", value: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream});
        commit("setValueFor", {key: "android", value: /(android)/i.test(navigator.userAgent)});
        commit("setValueFor", {key: "desktop", value: !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test((navigator.userAgent || navigator.vendor || window.opera)) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4)))}); // eslint-disable-line
        commit("setValueFor", {key: "mobile", value: (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test((navigator.userAgent || navigator.vendor || window.opera)) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4)))}); // eslint-disable-line
        commit("setValueFor", {key: "ie", value: navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)}); // eslint-disable-line
        commit("setValueFor", {key: "platform", value: state.ios ? "iOS" : state.android ? "Android" : "Desktop"});
    },

    checkWebGL({commit}) {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        commit("setValueFor", {key: "webGLSupported", value: !!context});
        canvas = null;
        context = null;
    }
};
