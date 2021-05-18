var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const passport = require('../configPassport')
const isLoggedIn = passport.isLoggedIn;

var User = require('../models/user');
var userController = require('../controllers/userController');
var Post = require('../models/post');
var postController = require('../controllers/postController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Member club', user: req.user });
});

router.get('/users', userController.user_list);
router.get('/posts', isLoggedIn, postController.post_list);

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register profile' });
});

router.post(
  '/register',   
  body('email').isEmail().normalizeEmail(),
  body('password').exists().isLength({ min: 5 }),
  function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        const user = new User({
            name: req.body.name,
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
});


module.exports = router;
