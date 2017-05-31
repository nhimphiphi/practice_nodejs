'use strict';

const contactController = require('../controller/contact');
const paramsValidator = require('../validates/get_contact');
const payloadValidator = require('../validates/post_contact');
const payloadLoginValidator = require('../validates/post_userlogin');

module.exports = function () {
  return [
     {
      method: 'GET',
      path: '/login',
      config: {
        handler: contactController.login,
        // validate: {
        //   payload: payloadLoginValidator
        // },
        auth: 'token',
        description: 'create new access token',
        notes: 'return 200 when login successful',
        tags: ['api', 'get', 'login']
      }
    },
    {
      method: 'GET',
      path: '/api/contacts/',
      config: {
        handler: contactController.findAll,
        description: 'Get list contact',
        tags: ['api', 'get', 'contact']
      }
    },
    {
      method: 'GET',
      path: '/api/contacts/{id}',
      config: {
        handler: contactController.findOne,
        description: 'Get a contact info',
        tags: ['api', 'get', 'contact']
      }
    },
    {
      method: 'POST',
      path: '/api/contacts/',
      config: {
        auth: false,
        handler: contactController.insert,
        validate: {
          payload: payloadValidator
        },
        description: 'create new one contact',
        tags: ['api', 'post', 'contact']
      }
    },
    {
      method: 'PUT',
      path: '/api/contacts/{id}',
      config: {
        auth: false,
        cors: true,
        handler: contactController.update,
        validate: {
          params: paramsValidator,
          payload: payloadValidator
        },
        description: 'update exist a contact by id',
        tags: ['api', 'put', 'contact']
      }
    },
    {
      method: 'DELETE',
      path: '/api/contacts/{id}',
      config: {
        handler: contactController.delete,
        validate: {
          params: paramsValidator
        },
        description: 'delete exist a contact by id',
        tags: ['api', 'delete', 'contact']
      }
    }
  ];
}();