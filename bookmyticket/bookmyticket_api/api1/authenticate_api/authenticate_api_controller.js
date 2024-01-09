"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_user = void 0;
var authenticate_api_model_1 = require("./authenticate_api_model");
var login_user = function (req, username, password) {
    return new Promise(function (resolve, reject) {
        (0, authenticate_api_model_1.getUserByUsername)(username)
            .then(function (user) {
            if (user.length > 0 && user[0].password === password) {
                req.session.user = user;
                resolve(true);
            }
            else {
                resolve(false);
            }
        })
            .catch(function (error) {
            reject(error);
        });
    });
};
exports.login_user = login_user;
