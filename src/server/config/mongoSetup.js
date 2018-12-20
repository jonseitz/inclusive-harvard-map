const MongoMemoryServer = require('mongodb-memory-server').default;

const mongod = new MongoMemoryServer();

module.exports = mongod.getPort()
  .then((port) => {
    process.env.MONGO_URI = `127.0.0.1:${port}`;
    return mongod.getDbName();
  })
  .then((name) => {
    process.env.MONGO_INITDB_DATABASE = name;
    process.env.MONGO_USER = '';
    process.env.MONGO_PASS = '';
  });

