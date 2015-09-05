var handlebars = require('handlebars');
var fs = require('fs');

var data = {
  title: 'HUEHEUHEUE hueheuehue Hehehehe',
  author: 'HUEHEUE',
  tags: ['hueheueh', 'calidad de vida', 'dophp']
};

data.body = process.argv[2];

fs.readFile('example.html', 'utf-8', function(error, source) {
  handlebars.registerHelper('custom_title', function(title) {
    var words = title.split(' ');
    for (var i = 0; i < words.length; i++) {
      if(words[i].length > 4) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      } 
    }
    title = words.join(' ');
    return title;
  });

  var template = handlebars.compile(source);
  var html = template(data);
  console.log(html);
});