'use strict';

const Boom = require('boom');

const contactData = require('../data/contact');

function ContactController() {
  return {
    login: (request, reply) => {
      const { username, password } = request;
      reply(`User: ${username}`, `User: ${username}`)
    },
    findAll: (request, reply) => {
      reply(contactData);
    },
    findOne: (request, reply) => {
      console.log('query', request.query);
      console.log('params', request.params);
      console.log('params id', request.params.id);

      let contact = contactData.find(contact => contact.id === request.params.id);

      if (!contact) {
        return reply(Boom.notFound('contact not found!'));
      }
      reply(contact);
    },
    insert: (request, reply) => {
      console.log('request.payload', request.payload);
      let submittedData = request.payload;
      submittedData.id = contactData.length + 1;
      contactData.push(submittedData);

      // The way we respond depends on what we want
      // reply({ message: 'Contact added!' });
      reply(contactData);
    },
    update: (request, reply) => {
      console.log('request.payload', request.payload);
      const contact = request.payload;
      const { id, name, username, email, password } = contact;

      if (username) {
        contact.username = username;
      }

      reply(contact);
    },
    delete: (request, reply) => {
      console.log('request.params.id', request.params.id);
      reply('delete' + request.params.id);
    }  
  }
};

var contactController = new ContactController();
module.exports = contactController;