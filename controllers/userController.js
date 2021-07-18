var User = require('../models/user');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.user_list = function(req, res) {
    User.find()
    .sort([['name', 'ascending']])
    .exec(function (err, users) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('user_list', { title: 'User list', user_list: users });
    });
};

exports.registerUser = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        const user = new User({
            username: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            member: "Member"
        }).save(err => {
            if (err) { 
            return next(err);
            };
            res.redirect("/");
        });
    });
}