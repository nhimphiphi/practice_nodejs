'use strict';

const Joi = require('joi');

const payloadValidator = Joi.object({
   name: Joi.string().required(),
   username: Joi.string().max(255).min(3).max(100).optional(),
   email: Joi.string().email().allow('').optional(),
   password: Joi.string().regex(/[A-Za-z0-9]/).optional()
});

module.exports = payloadValidator;