var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var mongoskin = require('mongoskin');
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@127.0.0.1:27017/blog';
var database = mongoskin.db(dbUrl, { safe: true });
var collections = {
  articles: database.collection('articles'),
  users: database.collection('users')
};
var session = require('express-session');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var app = express();
app.locals.appTitle = 'hello-world'
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade');

app.use(function(request, response, next) {
  if(!collections.articles || !collections.users) {
    return next(new Error('No collections.'));
  }
  request.collections = collections;
  return next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Pages and routes
app.get('/', routes.index);
app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);
app.get('/admin',  routes.article.admin);
app.get('/post',  routes.article.post);
app.post('/post', routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);

// REST API routes
app.get('/api/articles', routes.article.list);
app.post('/api/articles', routes.article.add);
app.put('/api/articles/:id', routes.article.edit);
app.del('/api/articles/:id', routes.article.del);


app.all('*', function (request, response) {
  response.send(404);
});

var server = http.createServer(app);
var boot = function() {
  server.listen(app.get('port'), function() {
    console.info('Express is burlao, this IS THE JUNGLE on port ' + app.get('port'));
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