'use strict'
require('dotenv').config();
const Hapi = require('hapi');
const server = new Hapi.Server();
const Joi = require('joi');
const HapiSwagger = require('hapi-swagger');
const HapiJWT = require('hapi-auth-jwt');
const jwt = require('jsonwebtoken');
const Inert = require('inert');
const Vision = require('vision');
const routes = require('./server/routes/contact');

const PORT = process.env.PORT || '7000';
const privateKey = process.env.JWT_PRIVATE_KEY

server.connection({ 
  host: '127.0.0.1',
  port: PORT
});

const swagerOptions = {
  info: {
    'title': 'Test API Documentation',
    'version': '0.0.1'
  }
};

const accounts = {
    123: {
        id: 123,
        user: 'john',
        fullName: 'John Doe',
        scope: ['a', 'b']
    }
};
const token = jwt.sign({ accountId: 123 }, privateKey, { algorithm: 'HS256'} );
const validate = function (request, decodedToken, callback) {
    var error,
        credentials = accounts[decodedToken.accountId] || {};
    if (!credentials) {
        return callback(error, false, credentials);
    }
    return callback(error, true, credentials)
};

server.register([
	Inert,	
	Vision,
	{
		'register': HapiSwagger,
		'options': swagerOptions
	},
	HapiJWT
	], (err) => {
	
	server.auth.strategy('token', 'jwt', {
        key: privateKey,
				validateFunc: validate,
        verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
	});
	server.route(routes);
	server.start( (err) => {
			if (err) {
					console.log(err);
			} else {
					console.log('Server running at:', server.info.uri);
			}
	});
});
