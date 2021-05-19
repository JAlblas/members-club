var Post = require('../models/post');

exports.post_list = function(req, res, next) {
    Post.find()
    .populate('user')
    .sort([['timestamp', 'ascending']])
    .exec(function (err, posts) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('post_list', { title: 'Message list', post_list: posts, user: req.user });
    });
};