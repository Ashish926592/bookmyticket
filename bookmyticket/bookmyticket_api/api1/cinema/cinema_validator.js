"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_delete_cinema = exports.validate_update_cinema = exports.validate_add_cinema = void 0;
var Joi = require("@hapi/joi");
var validate_add_cinema = function (req, res, next) {
    var schema = Joi.object({
        code: Joi.number().integer().min(4).required(),
        name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
        city_id: Joi.number().integer().min(1).required(),
        address: Joi.string().min(2).required()
    }).unknown(false);
    var error = schema.validate(req.query, { abortEarly: false }).error;
    if (error) {
        var details = error.details;
        res.status(404).json({ error: details });
    }
    else {
        next();
    }
};
exports.validate_add_cinema = validate_add_cinema;
var validate_update_cinema = function (req, res, next) {
    // Define a Joi schema for ID validation
    var schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
        code: Joi.number().integer().min(4).required(),
        name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
        city_id: Joi.number().integer().min(1).required(),
        address: Joi.string().min(2).required()
    }).unknown(false);
    var error = schema.validate(req.query, { abortEarly: false }).error;
    if (error) {
        var details = error.details;
        res.status(404).json({ error: details });
    }
    else {
        next();
    }
};
exports.validate_update_cinema = validate_update_cinema;
var validate_delete_cinema = function (req, res, next) {
    var schema = Joi.object({
        id: Joi.string().min(1).required()
    }).unknown(false);
    var error = schema.validate(req.query, { abortEarly: false }).error;
    if (error) {
        var details = error.details;
        res.status(404).json({ error: details });
    }
    else {
        next();
    }
};
exports.validate_delete_cinema = validate_delete_cinema;
