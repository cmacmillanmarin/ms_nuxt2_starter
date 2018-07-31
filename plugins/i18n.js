//
// plugins/i18n.js

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Config from "~/config/manifest";

Vue.use(VueI18n);

export default ({ app, store }) => {

    let messages = {};

    Config.langs.forEach(lang => {
        messages[lang] = require('~/copy/' + lang + '.json');
    });

    app.i18n = new VueI18n({
        locale: store.state.lang.locale,
        fallbackLocale: Config.langs[0],
        messages
    })

    app.i18n.path = (link) => {
        if (app.i18n.locale === app.i18n.fallbackLocale) {
            return `/${link}`
        }

        return `/${app.i18n.locale}/${link}`
    }
}
