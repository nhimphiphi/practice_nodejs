'use strict';

const Joi = require('joi');

const paramsValidator = Joi.object({
   id: Joi.string(),
   name: Joi.string().optional()
});

module.exports = paramsValidator;