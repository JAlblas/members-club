var User = require('../models/user');

exports.user_list = function(req, res) {
    res.render('user_list', {users: users});
};