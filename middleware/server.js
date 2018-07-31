//
// middleware/server.js

module.exports = function (req, res, next) {

    console.log("Hi from server! ");

    next();
}
