const MongoClient = require("mongodb").MongoClient;

const settings ={
  mongoConfig: {
    serverUrl: "mongodb://localhost:27017/",
    database: "final546"
  }
};

let fullMongoUrl = settings.mongoConfig.serverUrl +
                   settings.mongoConfig.database;

let _connection = undefined;
let _db = undefined

module.exports =  async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(fullMongoUrl);
    _db = await _connection.db(settings.mongoConfig.database);
  }
  return _db;
};

