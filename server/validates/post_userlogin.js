'use strict';

const Joi = require('joi');

const payloadLoginValidator = Joi.object({
    username: Joi.string().max(255).min(3).max(60).required().example('test1'),
    password: Joi.string().max(255).regex(/[A-Za-z0-9]/).required().example('1qazxsw2')
});

module.exports = payloadLoginValidator;