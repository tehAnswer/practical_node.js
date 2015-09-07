exports.show = function(request, response, next) {
  if (!request.params.slug) {
    return next(new Error('Missing param slug.'));
  }
  request.collections.articles.findOne({ slug: request.params.slug }, function(error, item) {
    if(error) {
      return next(error);
    }
    if(!item.published) {
      return response.send(401);
    } else {
      response.render('article', item);
    }
  });
};

exports.list = function(request, response, next) {
  request.collections.articles.find({}).toArray(function(error, items) {
    if (error) {
      return next(error);
    }
    response.send({ articles: items });
  });
};

exports.add = function(request, response, next) {
  if(!request.body.article) {
    return next(new Error('No article payload.'));
  }
  var article = request.body.article;
  article.published = false;
  req.collections.articles.insert(article, function(error, item) {
    if(error) {
      return next(error);
    }
    response.send(item);
  });
};

exports.edit = function(request, response, next) {
  if(!request.params.id) {
    return next(new Error('Missing param id'));
  }

  req.collections.articles.updateById(reques.params.id, { $set: request.body.article }, function(error, count) {
    if(error) {
      return next(error);
    }
    response.send({affectedCouunt: count});
  });
};


exports.del = function(req, res, next) {
  if (!req.params.id) {
    return next(new Error('Missing param id.'));
  }
  req.collections.articles.removeById(req.params.id, function(error, count) {
    if (error) {
      return next(error);
    }
    res.send( { affectedCount: count } );
  });
};


exports.post = function(req, res, next) {
  if (!req.body.title) {
    res.render('post');
  }
};



exports.postArticle = function(req, res, next) {
  if (!req.body.title || !req.body.slug || !req.body.text ) {
    return res.render('post', {error: 'Fill title, slug and text.'});
  }
  var article = {
    title: req.body.title,
    slug: req.body.slug,
    text: req.body.text,
    published: false
  };
  req.collections.articles.insert(article, function(error, articleResponse) {
    if (error) {
      return next(error);
    }
    res.render('post', {error: 'Article was added. Publish it on Admin page.'});
  });
};


exports.admin = function(req, res, next) {
  req.collections.articles.find({},{sort: {_id:-1}}).toArray(function(error, articles) {
    if (error) return next(error);
    res.render('admin',{articles:articles});
  });

}