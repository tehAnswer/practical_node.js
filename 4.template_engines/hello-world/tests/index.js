var boot = require('../app').boot;
var shutdown = require('../app').shutdown;
var port = require('../app').port;
var superagent = require('superagent');
var expect = require('expect.js');

describe('server', function () {

  before(function () {
    boot();
  });

  describe('home page', function () {
    it('should respond to GET', function(done) {
      var request = superagent.get('http://127.0.0.1:' + port);
      request.end(function(response) {
        expect(response.status).to.equal(200);
        done();
      });
    });
  });

  after(function() {
    shutdown();
  });
  
});