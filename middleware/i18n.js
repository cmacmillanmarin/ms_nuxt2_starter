//
// middleware/i18n.js

export default function({ isHMR, app, store, route, params, redirect }) {

    const defaultLocale = app.i18n.fallbackLocale;

    if (isHMR) return;

    const locale = params.lang || defaultLocale;

    store.commit("lang/setLocale", locale);

    app.i18n.locale = store.state.lang.locale;

    if (store.state.lang.locales.indexOf(locale) === -1 || !params.lang) {

        return redirect(`/${defaultLocale}`);
    }
}
