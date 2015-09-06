var mongo = require('mongodb');
var dbHost = '127.0.0.1';
var dbPort = 27017;


// Constructors 
var Db = mongo.Db;
var Server = mongo.Server;

var database = new Db('local', new Server(dbHost, dbPort), { safe: true });

database.open(function(error, dbConnection) {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  dbConnection.collection('messages').findOne({}, function(error, item) {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.info('[found] ', item);
    item.text = process.argv[2];
    dbConnection.collection('messages').save(item, function(error, item) {
      console.info('[saved] ', item);
    });

    dbConnection.collection('messages').findOne({}, function(error, item) {
      if (error) {
        console.error(error);
        process.exit(1);
      }
      console.info('[found] ', item);
      database.close();
      process.exit(0);
    });
  });
});