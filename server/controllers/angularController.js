"use strict";

const express = require('express');
const path = require('path');

module.exports = {
    addApp: function (app) {

        let appPath = "../../../dist-client/";

        app.use(express.static(__dirname + appPath));
            
        app.get('/*', function(req, res) {
            res.sendFile(path.join(__dirname + appPath + 'index.html'));
        });
    }
}
