//
// utils/core/Tracking.js

import checks from './Checks.js';

class Tracking {
    /**
     * @param {boolean} [enabled = true]
     * @param {boolean} [verbose = false]
     */
    constructor(enabled = true, verbose = false, forceSSL = true) {
        this.isEnabled = enabled;
        this.isVerbose = verbose;

        if (forceSSL && this.isEnabled && window.ga) {
            window.ga('set', 'forceSSL', true);
        }
    }

    /**
     * @param {Object} event
     * @param {string} event.description
     * @param {string} event.category
     * @param {string} event.action
     * @param {string} event.label
     * @param {Object} [params = {}]
     */
    trackEvent(event, params = {}) {
        const {
            description,
            category,
            action
        } = event;

        let {
            label
        } = event;

        label = label.replace(/\{\{(.*?)\}\}/g, (match, key) => {
            const param = params[key];

            return param !== void 0 ?
                param :
                '';
        });

        if (this.isVerbose) {
            console.log(`Track event: ${description} ('send', 'event', '${category}', '${action}', '${label}')`);
        }

        if (this.isEnabled && window.ga) {
            window.ga('send', 'event', category, action, label);
        }
    }

    /**
     * @param {Object} page
     * @param {string} page.page
     */
    trackPage(page) {
        if (this.isVerbose) {
            console.log(`Track page: ${page.page}`);
        }

        if (this.isEnabled && window.ga) {
            window.ga('send', 'pageview', page.page);
        }
    }

    /**
     * @param {Object} event
     * @param {string} event.name
     * @param {boolean} event.interaction
     */
    trackFloodlightEvent({
        name,
        interaction
    }) {
        if (this.isVerbose) {
            console.log(`Track Floodlight event: ${name}, ${interaction}`);
        }

        if (this.isEnabled && window.dataLayer) {
            window.dataLayer.push({
                'event': name,
                'eventNonInteraction': interaction
            });
        }
    }

    /**
     * @param {Object} event
     * @param {string} event.name
     * @param {Num} event.position
     */
    trackUserClickCard(name, position) {
        if (this.isVerbose) {
            console.log('Track User Click Card event:', name, position);
        }

        if (this.isEnabled && window.dataLayer) {
            window.dataLayer.push({
                'event': name,
                'position': position
            });
        }
    }

    /**
     * @param {Object} event
     * @param {string} event.description
     * @param {string} event.name
     * @param {string} event.category
     * @param {string} event.action
     * @param {string} event.label
     * @param {Object} [params = {}]
     */
    trackDataLayerEvent(event, params = {}) {
        const {
            description,
            name,
            category,
            action
        } = event;

        let {
            label
        } = event;

        label = label.replace(/\{\{(.*?)\}\}/g, (match, key) => {
            const param = params[key];

            return param !== void 0 ?
                param :
                '';
        });

        if (this.isVerbose) {
            console.log(`Track DataLayer: ${description} ('send', 'event', '${name}', '${category}', '${action}', '${label}')`);
        }

        if (this.isEnabled && window.dataLayer) {
            window.dataLayer.push({
                'event': name,
                'event_category': category,
                'event_action': action,
                'event_label': label
            });
        }
    }


    trackDeviceType() {
        if (this.isVerbose) {
            console.log('Track device type:', checks.desktop ? 'desktop' : 'mobile');
        }

        if (this.isEnabled && window.dataLayer) {
            window.dataLayer.push({
                'device': checks.desktop ? 'desktop' : 'mobile'
            });
        }
    }
}

const enabled = process.env.NODE_ENV !== 'development';
const verbose = !enabled;

export default new Tracking(enabled, verbose, true);
