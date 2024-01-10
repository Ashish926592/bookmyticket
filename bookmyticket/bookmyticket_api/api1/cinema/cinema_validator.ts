import * as Joi from '@hapi/joi';


export const validate_add_cinema = (req, res, next) => {
    const schema = Joi.object({
        code:Joi.number().integer().min(4).required(),
        name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
        city_id:Joi.number().integer().min(1).required(),
        address: Joi.string().min(2).required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}


export const validate_update_cinema = (req, res, next) => {
    // Define a Joi schema for ID validation
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
        code:Joi.number().integer().min(4).required(),
        name: Joi.string().regex(/^[a-zA-Z0-9\s]+$/).required(),
        city_id:Joi.number().integer().min(1).required(),
        address: Joi.string().min(2).required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}


export const validate_delete_cinema = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().min(1).required()

    }).unknown(false)

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const { details } = error
        res.status(404).json({ error: details })
    } else {
        next();
    }

}














