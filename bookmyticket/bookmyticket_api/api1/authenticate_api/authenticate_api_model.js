"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = void 0;
var db = require("./db");
var getUserByUsername = function (username) {
    return new Promise(function (resolve, reject) {
        var query = "SELECT * FROM users WHERE username = $1";
        db.query(query, [username], function (err, results) {
            if (err) {
                reject(err);
            }
            else {
                // Assuming you want to return the rows as an array of User objects
                var users = (results === null || results === void 0 ? void 0 : results.rows) || [];
                resolve(users);
            }
        });
    });
};
exports.getUserByUsername = getUserByUsername;
