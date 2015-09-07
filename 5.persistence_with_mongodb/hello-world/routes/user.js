exports.list = function(request, response) {
  response.send('respond with a resource');
};

exports.login = function(request, response, next) {
  response.render('login');
};

exports.logout = function(request, response, next) {
  response.redirect('/');
};

exports.authenticate = function(request, response, next) {
  response.redirect('/admin');
};