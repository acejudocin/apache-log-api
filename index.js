// Connects to DB and starts server app
const app         = require('./app')
const config      = require('./config')
const MongoClient = require("mongodb")
const LogsDAO  = require("./src/dao/logsDAO")

MongoClient.connect(
    config.DB_URI,
    {
        poolSize: 10,
        wtimeout: 2500,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
)
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await LogsDAO.injectDB(client)
        app.listen(config.port, () => {
            console.log(`API listening on port ${config.port}`)
        })
    })
