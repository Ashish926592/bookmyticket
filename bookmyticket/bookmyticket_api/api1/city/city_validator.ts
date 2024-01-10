import * as Joi from '@hapi/joi';
import * as db from './db'

export const validate_add_city = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(10).required(),
        state: Joi.string().min(3).max(10).required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}


export const validate_update_city = (req, res, next) => {
    // Define a Joi schema for ID validation
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
        name: Joi.string().min(2).max(10).required(),
        state: Joi.string().min(3).max(10).required()
    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}


export const validate_delete_city = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().min(1).max(10).required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}














