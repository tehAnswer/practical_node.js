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

var server = http.createServer(app);
var boot = function() {
  server.listen(app.get('port'), function() {
    console.info('Express is burlao, this IS THE JUNGLE on port' + app.get('port'));
  });
}

var shutdown = function() {
  server.close();
}

if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module, primo.');
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}