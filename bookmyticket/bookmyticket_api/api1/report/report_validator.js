"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_report10 = exports.validate_report6 = exports.validate_report4 = exports.validate_report3 = exports.validate_report2 = exports.validate_report1 = void 0;
var Joi = require("@hapi/joi");
var validate_report1 = function (req, res, next) {
    var schema = Joi.object({
        city_name: Joi.string().min(2).pattern(/^[a-zA-Z\s]+$/).required()
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
exports.validate_report1 = validate_report1;
var validate_report2 = function (req, res, next) {
    var schema = Joi.object({
        cinema_hall: Joi.string().min(1).regex(/^[a-zA-Z0-9\s]+$/).required()
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
exports.validate_report2 = validate_report2;
var validate_report3 = function (req, res, next) {
    var schema = Joi.object({
        movie_name: Joi.string().min(1).max(255).regex(/^[a-zA-Z0-9\s]+$/).required()
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
exports.validate_report3 = validate_report3;
var validate_report4 = function (req, res, next) {
    var schema = Joi.object({
        city_name: Joi.string().min(2).pattern(/^[a-zA-Z\s]+$/).required(),
        movie_name: Joi.string().min(1).regex(/^[a-zA-Z0-9\s]+$/).required(),
        cinema_name: Joi.string().min(2).regex(/^[a-zA-Z0-9\s]+$/).required(),
        hall_name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
        date: Joi.date().iso().max('2050-12-31').required()
    }).unknown(false);
    var error = schema.validate(req.body, { abortEarly: false }).error;
    if (error) {
        var details = error.details;
        res.status(404).json({ error: details });
    }
    else {
        next();
    }
};
exports.validate_report4 = validate_report4;
var validate_report6 = function (req, res, next) {
    var schema = Joi.object({
        year: Joi.number().integer().min(4).required()
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
exports.validate_report6 = validate_report6;
var validate_report10 = function (req, res, next) {
    var schema = Joi.object({
        movie_name: Joi.string().min(1).regex(/^[a-zA-Z0-9\s]+$/).required(),
        hall_name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
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
exports.validate_report10 = validate_report10;
