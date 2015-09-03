var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade');

app.all('*', function (request, response) {
  response.render('index', { msg: 'Hello.'} );
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Listening at ' + app.get('port'));
});
