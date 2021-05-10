var User = require('../models/post');

exports.post_list = function(req, res) {
    res.render('post_list', {posts: users});
};