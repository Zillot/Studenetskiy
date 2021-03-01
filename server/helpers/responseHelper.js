"use strict";

module.exports = {
    error: function (res, code, httpCode, message) {
        var errorObj = {
            message: message,
            externalErrorCode: code ? code : 0 
        }

        res.status(httpCode ? httpCode : 500);
        response(res, 'error', errorObj);
    },
    success: function (res, result) {
        res.status(200);
        response(res, 'success', result);
    },
    withDefError: function (res, queryPromise) {
        queryPromise.catch((error) => { this.error(res, 0, 500, "unknown error [" + error + "]") });
        return queryPromise;
    }
}

function response (res, type, obj) {
    var responseObj = {
        type: type,
        response: obj
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON. stringify(responseObj));
}
