//
// store/lang.js

import Config from "~/config/manifest";

export const state = () => ({
    locales: Config.langs,
    locale: Config.langs[0],
})

export const mutations = {
    setLocale(state, locale) {

        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale;
        }
    }
}
