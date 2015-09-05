var jade = require('jade');
var fs = require('fs');

var data = {
  title: "Sergio is rendering shit",
  author: {
    twitter: "HUEHEUE",
    name: "HUEHEUEHEU"
  },
  tags: ['hueheuehue', 'calidad de vida', 'asturias', 'dotphp']
};

data.body = process.argv[2];

fs.readFile('twitter.jade', 'utf-8', function(error, source) {
  var template = jade.compile(source);
  var html = template(data);
  console.log(html);
});