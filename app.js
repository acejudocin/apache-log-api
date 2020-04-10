'use strict'

const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const routes     = require('./src/routes');

//Swagger-stats
var swStats = require('swagger-stats');
app.use(swStats.getMiddleware({}));

// Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;