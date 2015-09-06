var mongoskin = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;
var dbHost = '127.0.0.1';
var dbPort = 27017;

var database = mongoskin.db(dbHost + ':' + dbPort + '/local', { safe: true });

var findOneAndAddText = function (text, fn) {
  database.collection('messages').findOne({}, function (error, item) {
    if(error) {
      console.error(error);
      process.exit(1);
    }
    console.info('[found] ', item);
    item.text = text;
    var id = item._id.toString();
    database.collection('messages').save(item, function(error, count) {
      console.info('[saved] ', count);
      return fn(id);
    });
  });
};

database.bind('messages', {
  findOneAndAddText: findOneAndAddText 
});

database.collection('messages').findOneAndAddText(process.argv[2], function(id) {
  //database.collection('...').findById(id, callback) would work too.
  database.collection('messages').findById({_id: new ObjectID(id) }, function (error, item) {
    if(error) {
      console.error(error);
      process.exit(1);
    }
    console.info('[found] ', item);
    database.close();
    process.exit(0);
  });
})