import * as Joi from 'joi';

export default {
    login: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
    },
    create: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
            access: Joi.string().required(),
        },
    },
    updateById: {
        params: {
            id: Joi.string().required(),
        },
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
            access: Joi.string().required(),
        },
    },
    getById: {
        params: {
            id: Joi.string().required(),
        },
    },
    deleteById: {
        params: {
            id: Joi.string().required(),
        },
    },
};
