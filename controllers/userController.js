var User = require('../models/user');

exports.user_list = function(req, res) {
    User.find()
    .sort([['name', 'ascending']])
    .exec(function (err, users) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('user_list', { title: 'User list', user_list: users });
    });
};