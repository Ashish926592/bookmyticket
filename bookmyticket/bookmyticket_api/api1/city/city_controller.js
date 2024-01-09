"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_data = exports.update_data = exports.add_data = exports.get_data = void 0;
var model = require("./city_model");
exports.get_data = (function (req, res, next) {
    model.get_city_data().then(function (cityData) {
        res.json(cityData);
    }).catch(function (error) {
        console.error(error);
    });
});
exports.add_data = (function (req, res, next) {
    var _a = req.query, name = _a.name, state = _a.state;
    if (!res.headersSent) {
        // console.log(name,state);
        if (name !== undefined && state !== undefined) {
            model.add_city_data(name, state).then(function (response) {
                res.send(response);
            }).catch(function (error) {
                console.error(error);
            });
        }
    }
});
exports.update_data = (function (req, res, next) {
    var _a = req.query, id = _a.id, name = _a.name, state = _a.state;
    if (id !== undefined && name !== undefined && state !== undefined) {
        model.update_city_data(name, state, id).then(function (response) {
            res.send(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
});
exports.delete_data = (function (req, res, next) {
    var id = req.query.id;
    if (id !== undefined) {
        model.delete_city_data(id).then(function (response) {
            res.send(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
});
