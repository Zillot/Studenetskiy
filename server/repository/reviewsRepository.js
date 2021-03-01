"use strict";

var env = require("./baseRepository")

module.exports = {
    getAll: function () {
        return env.getDb().manyOrNone("SELECT * from review")
    },
    create: function (model) {
        return env.getDb().one("INSERT INTO review(photo, name, text) " +
            "VALUES ($(photo), $(name), $(text)) RETURNING id", model);
    },
    delete: function (id) {
        return env.getDb().none("DELETE FROM review WHERE id=$1", id);
    }
}
