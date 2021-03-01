"use strict";

const responseHelper = require('../helpers/responseHelper.js');
const reviewsRepository = require('./../repository/reviewsRepository.js');

const controllerName = "review";

module.exports = {
    addApp: function (app) {
        app.get(`/api/${controllerName}`, async function(req, res) {
            let reviews = await reviewsRepository.getAll();

            //TODO top 10

            responseHelper.success(res, reviews);
        });
    }
}
