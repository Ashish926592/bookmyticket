"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_data = exports.update_data = exports.add_data = exports.get_data = void 0;
var model = require("./cinema_model");
exports.get_data = (function (req, res, next) {
    model.get_cinema_data().then(function (response) {
        res.json(response);
    }).catch(function (error) {
        console.error(error);
    });
});
exports.add_data = (function (req, res, next) {
    var _a = req.query, code = _a.code, name = _a.name, city_id = _a.city_id, address = _a.address;
    if (code !== undefined && name !== undefined && city_id !== undefined && address !== undefined) {
        model.add_cinema_data(code, name, city_id, address).then(function (response) {
            res.send(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.status(400).send('Bad Request: Missing required parameters');
    }
});
exports.update_data = (function (req, res, next) {
    var _a = req.query, code = _a.code, name = _a.name, city_id = _a.city_id, address = _a.address, id = _a.id;
    if (code !== undefined && name !== undefined && city_id !== undefined && address !== undefined && id !== undefined) {
        model.update_cinema_data(code, name, city_id, address, id).then(function (response) {
            res.send(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.status(400).send('Bad Request: Missing required parameters');
    }
});
exports.delete_data = (function (req, res, next) {
    var id = req.query.id;
    if (id !== undefined) {
        model.delete_cinema_data(id).then(function (response) {
            res.send(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.status(400).send('Bad Request: Missing required parameters');
    }
});
