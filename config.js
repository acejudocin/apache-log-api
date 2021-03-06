const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port:       process.env.PORT       || 3001,
  DB_URI:     process.env.DB_URI     || 'mongodb://user:pass@host:port/authdb',
  DB_NS:      process.env.DB_NS      || 'dbname',
  DB_COLLECTION: process.env.DB_COLLECTION || 'collectionname'
}