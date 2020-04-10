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

module.exports = {
  createLog
}