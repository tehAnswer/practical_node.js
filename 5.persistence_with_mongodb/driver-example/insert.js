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
  console.log('db state:', database._state);
  item = {
    name: 'Sergio'
  }

  dbConnection.collection('messages').insert(item, function(error, item) {
    if(error) {
      console.error(error);
      process.exit(1);
    }
    console.info('[created]', item);
    database.close();
    process.exit(0);
  });
});