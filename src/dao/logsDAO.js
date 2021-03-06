const config = require('../../config')

let logs

module.exports = class LogsDAO {
  static async injectDB(conn) {
    if (logs) {
      return
    }
    try {
      logs = await conn.db(config.DB_NS).collection(config.DB_COLLECTION)
    } catch (e) {
      console.error(`Unable to establish collection handler in LogsDAO: ${e}`)
    }
  }

  /**
   * Adds a log to the `config.DB_COLLECTION` collection
   * @param {log} log - The information of the log to add
   * @returns {DAOResponse} Returns either a "success" or an "error" Object
   */
  static async addLog(log) {

    try {
      await logs.insertOne(log)
      return { success: true }
    } catch (e) {
      console.error(`Error occurred while adding new log, ${e}.`)
      return { error: e }
    }
  }

  /** Returns the total number of request to Apache server */
  static async getTotalRequests() {
    return await logs.estimatedDocumentCount({})
  }

  static async getBrowsers() {
    try {
      let stats = new Array();
      let collectionDocuments = await this.getTotalRequests()

      stats.push({
        name: 'Firefox',
        y: await logs.find({"reqHeaderUserAgent": {$regex: ".*Firefox/.*"}}).count() * 100 / collectionDocuments})

      stats.push({
        name: 'Seamonkey',
        y: await logs.find( {"reqHeaderUserAgent": {$regex: ".*Seamonkey/.*"}}).count() * 100 / collectionDocuments})

      stats.push({
        name: 'Chrome',
        y: await logs.find( {"reqHeaderUserAgent": {$regex: ".*Chrome/.*"}}).count() * 100 / collectionDocuments})

      stats.push({
        name: 'Edge',
        y: await logs.find( {"reqHeaderUserAgent": {$regex: ".*Edge/.*"}}).count() * 100 / collectionDocuments})

      stats.push({
        name: 'Chromium',
        y: await logs.find( {"reqHeaderUserAgent": {$regex: ".*Chromium/.*"}}).count() * 100 / collectionDocuments})

      stats.push({
        name: 'Safari',
        y: await logs.find( {"reqHeaderUserAgent": {$regex: ".*Safari/.*"}}).count() * 100 / collectionDocuments})

      stats.push({
        name: 'Opera',
        y: await logs.find( { $or: [{"reqHeaderUserAgent": {$regex: ".*OPR/.*"}}, {"reqHeaderUserAgent": {$regex: ".*Opera/.*"}}]}).count() * 100 / collectionDocuments})
      
      stats.push({
        name: 'Internet Explorer',
        y: await logs.find( { $or: [{"reqHeaderUserAgent": {$regex: ".*MSIE.*"}}, {"reqHeaderUserAgent": {$regex: ".*Trident/7.0;.*"}}]}).count() * 100 / collectionDocuments})
      
      return stats

    } catch (e) {
      console.error(`Error occurred while retrieving browser stats from DB, ${e}.`)
      return { error: e }
    }
  }

  /** Get size of all responese in bytes */
  static async getTraffic() {
    try {
      let cursor = await logs.aggregate([
        {
          $group: {
            _id: null, 
            totalTraffic: { $sum: '$sizeCLF' }
          }
        }
      ]).toArray()

      return cursor[0].totalTraffic

    } catch (e) {
      console.error(`Error occurred while retrieving traffic stats from DB, ${e}.`)
      return { error: e }
    }
  }

  /** Get Apache distinct visitors */
  static async getDistinctVisitors() {
    try {
      let cursor = await logs.aggregate([
        {
          $group: {
            _id: '$remoteHost'
          }
        },
        {
          $count: 'distinctVisitors'
        }
      ]).toArray()

      return cursor[0].distinctVisitors

    } catch (e) {
      console.error(`Error occurred while retrieving distinct visitors stats from DB, ${e}.`)
      return { error: e }
    }
  }

}
