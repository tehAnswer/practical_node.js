var http = require('http');
var util = require('util');
var queryString = require('querystring');
var mongo = require('mongodb');

var host = process.env.MONGOHQ_URL || 'mongodb://@127.0.0.1:27017'
mongo.MongoClient.connect(host, function(error, db) {
  if(error) {
    throw error;
  }
  var collection = db.collection('test_collection');

  var app = http.createServer(function (request, response) {
    if(request.method === 'GET' && request.url === '/messages/list.json') {
      getRoute(request, collection, response);
    }

    else if(request.method === 'POST' && request.url === '/messages/create.json') {
      postRoute(request, collection, response);
    }
  });
  var port = process.env.PORT || 5000;
  app.listen(port);
  console.log('Listening all day loong homie at ' + port);
});

var getRoute = function (request, collection, response) {
  collection.find().toArray(function (error, results) {
    response.writeHead(200, {'Content-Type': 'application/json'});
    console.dir(results);
    response.end(JSON.stringify(results));
  });
};

var postRoute = function (request, collection, response) {
  request.on('data', function (data) {
    var formattedData = JSON.parse(data.toString('utf-8'));
    console.log(formattedData);
    collection.insert(formattedData, { safe: true }, function(error, object) {
      if(error) {
        throw error;
      }
      var body = JSON.stringify(object);
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(body);
    });
  });
};