const Joi = require('joi');

const db = require('./db')


exports.validate_report1 = (req, res, next) => {
    const schema = Joi.object({
       
        city_name: Joi.string().required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}

exports.validate_report2 = (req, res, next) => {
    const schema = Joi.object({
       
        cinema_hall: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}

exports.validate_report3 = (req, res, next) => {
    const schema = Joi.object({
       
        movie_name: Joi.string().required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}

exports.validate_report4 = (req, res, next) => {
    const schema = Joi.object({
        city_name: Joi.string().required(),
        movie_name: Joi.string().required(),
        cinema_name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
        hall_name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
        date: Joi.date().iso().max('2050-12-31').required()

    }).unknown(false)

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}

exports.validate_report6 = (req, res, next) => {
    const schema = Joi.object({
       
        year: Joi.number().integer().min(4).required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}

exports.validate_report10 = (req, res, next) => {
    const schema = Joi.object({
       
        movie_name: Joi.string().required(),
        hall_name: Joi.string().required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}















