"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
var express = require("express");
var authenticate_api_controller_1 = require("./authenticate_api_controller");
var router = express.Router();
exports.hello = router.post('/', function (req, res, next) {
    var _a = req.body, username = _a.username, password = _a.password;
    (0, authenticate_api_controller_1.login_user)(req, username, password)
        .then(function (success) {
        if (success) {
            res.send('Login successful');
            next();
        }
        else {
            res.status(401).send('Invalid username or password.');
        }
    })
        .catch(function (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});
