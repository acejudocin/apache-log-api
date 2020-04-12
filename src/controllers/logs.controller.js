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

/** Gets browsers percentage usage */
async function getBrowsers(req, res) {

  try {

    res.status(202).send(await logsDAO.getBrowsers())
    
  } catch (error) {
    res.status(500).send({ message: `Error retrieving browser stats from DB: ${error} ` });
  }
}

/** Obtains Apache general information:
 *  - TotalTraffic
 *  - DistinctVisitors
 *  - TotalRequests
 */
async function getGeneralInfo(req, res) {

  try {

    let stats = new Object()

    stats.totalTraffic = await logsDAO.getTraffic()
    stats.distinctVisitors = await logsDAO.getDistinctVisitors()
    stats.totalRequests = await logsDAO.getTotalRequests()

    res.status(200).send(stats)
    
  } catch (error) {
    res.status(500).send({ message: `Error retrieving general info from DB: ${error} ` });
  }
}


module.exports = {
  createLog,
  getBrowsers,
  getGeneralInfo
}