var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Member club' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register profile' });
});

router.post('/register', function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
          return next(err);
      }
      const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
          member: false
        }).save(err => {
          if (err) { 
            return next(err);
          };
          res.redirect("/");
        });
    });
});

module.exports = router;
