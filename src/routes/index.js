'use strict'

const cors = require('cors');
const express = require('express');
const logsController = require('../controllers/logs.controller');
const api = express.Router();

api.use(cors());
api.options('*', cors());

// ****** APACHE LOGS ************
api.post('/logs', logsController.createLog);

// ****** STATS ***********
api.get('/statistics/browsers', logsController.getBrowsers);

// ******* TEST ******
api.use("/hello", (req, res) => res.status(200).send("Hello world!"))
api.use("*", (req, res) => res.status(404).json({ error: "not found" }))

module.exports = api;
