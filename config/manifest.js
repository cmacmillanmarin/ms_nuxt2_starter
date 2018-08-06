//
// config/manifest.js

module.exports = {
    langs: [
        "en",
        "es"
    ],
    routes: [
        "",
        "about",
        "events"
    ],
    dynamicRoutes: [
        { route: "person", file: "./static/data/people/all.json" }
    ],
    staticDataCalls: [
        { call: "https://www.jsonstore.io/91a0754e7f37cc115ba33deb007d13276d6c1f8f309e44f084d4278c51c5fe08/people", name: "all", path: "people" },
        { call: "https://www.jsonstore.io/91a0754e7f37cc115ba33deb007d13276d6c1f8f309e44f084d4278c51c5fe08/people/0", name: "0", path: "people" },
        { call: "https://www.jsonstore.io/91a0754e7f37cc115ba33deb007d13276d6c1f8f309e44f084d4278c51c5fe08/people/1", name: "1", path: "people" },
        { call: "https://www.jsonstore.io/91a0754e7f37cc115ba33deb007d13276d6c1f8f309e44f084d4278c51c5fe08/people/2", name: "2", path: "people" }
    ]
}
