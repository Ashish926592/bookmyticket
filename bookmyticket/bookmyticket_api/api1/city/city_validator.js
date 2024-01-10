"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_delete_city = exports.validate_update_city = exports.validate_add_city = void 0;
var Joi = require("@hapi/joi");
var validate_add_city = function (req, res, next) {
    var schema = Joi.object({
        name: Joi.string().min(2).max(10).required(),
        state: Joi.string().min(3).max(10).required()
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
exports.validate_add_city = validate_add_city;
var validate_update_city = function (req, res, next) {
    // Define a Joi schema for ID validation
    var schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
        name: Joi.string().min(2).max(10).required(),
        state: Joi.string().min(3).max(10).required()
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
exports.validate_update_city = validate_update_city;
var validate_delete_city = function (req, res, next) {
    var schema = Joi.object({
        id: Joi.string().min(1).max(10).required()
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
exports.validate_delete_city = validate_delete_city;
