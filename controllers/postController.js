var Post = require('../models/post');

exports.post_list = function(req, res, next) {
    Post.find()
    .populate('user')
    .sort([['timestamp', 'ascending']])
    .exec(function (err, posts) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('post_list', { title: 'Message list', post_list: posts});
    });
};

exports.createMessage = function(req, res, next) {
    body('title').exists(),
    body('message').exists(),
    function(req, res, next) {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const post = new Post({
        title: req.body.title,
        message: req.body.message,
        user: req.user.id
      }).save(err => {
        if (err) { 
          return next(err);
        };
        res.redirect("/");
      });
}