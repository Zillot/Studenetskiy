"use strict";

const responseHelper = require('./../helpers/responseHelper.js');

module.exports = {
    addApp: function (app) {
        app.get('/api/*', function(req, res) {
            responseHelper.error(res, null, null, "no such route");
        });
    }
}
