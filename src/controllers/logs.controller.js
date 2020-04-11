'use strict'

const logsDAO = require('../dao/logsDAO');

/**
 * Stores new log to DB.
 * @param {*} req 
 * @param {*} res 
 */
async function createLog(req, res) {

  try {

    res.status(201).send(await logsDAO.addLog(req.body))
    
  } catch (error) {
    res.status(500).send({ message: `Error storing log into DB: ${error} ` });
  }
}

async function getBrowsers(req, res) {

  try {

    res.status(202).send(await logsDAO.getBrowsers())
    
  } catch (error) {
    res.status(500).send({ message: `Error retrieving browser stats from DB: ${error} ` });
  }
}

module.exports = {
  createLog,
  getBrowsers
}