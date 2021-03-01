"use strict";

var conectionStringHeroku = "postgres://awoltssjixhfwx:56e1c0f7b2ba7d317beed688a393b94a4cf99edce00982218d504621c298a43d@ec2-99-80-200-225.eu-west-1.compute.amazonaws.com:5432/d239s25lbp0d94";
var conectionStringLocal = "postgres://postgres:root@localhost:5432/studenetskiy";

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