"use strict";

var conectionStringHeroku = "";
var conectionStringLocal = "";

var pgp = require("pg-promise")();
var db = null;

module.exports = {
    getDb() {
        if (db == null) {
            if (process.env.NODE_ENV == "local") {
                db = pgp(conectionStringLocal);
            }
            else {
                db = pgp(conectionStringHeroku);
            }
        }
        
        return db;
    }
}