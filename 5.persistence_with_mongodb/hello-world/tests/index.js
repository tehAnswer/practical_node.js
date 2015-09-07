var boot = require('../app').boot;
var shutdown = require('../app').shutdown;
var port = require('../app').port;
var superagent = require('superagent');
var expect = require('expect.js');
var seedArticles = require('../db/seeds/articles.json');

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

    it('should contain posts', function(done) {
      var request = superagent.get('http://127.0.0.1:' + port);
      request.end(function (response) {
        seedArticles.forEach(function (item, index, list) {
          var header = '<h2><a href="/articles/' + item.slug + '">' + item.title;
          var azzert = item.published ? expect(response.text).to : expect(response.text).not.to; 
          azzert.contain(header);
        });
        done();
      });
    });
  });

  describe('article page', function () {
    it('should display text', function(done) {
      var articleCount = seedArticles.length;
      seedArticles.forEach(function(item, index, list) {
        var request = superagent.get('http://127.0.0.1:' + port + '/articles/' + seedArticles[index].slug);
        request.end(function(response) {
          if(item.published) {
            expect(response.text).to.contain(seedArticles[index].text);
          } else {
            expect(response.status).to.be(401);
          }
          if (index + 1 === articleCount) {
            done();
          }
        });
      });
    });
  });


  after(function() {
    shutdown();
  });
  
});