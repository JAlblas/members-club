var express = require('express');
var router = express.Router();

const { body, validationResult } = require('express-validator');

const passport = require('../configPassport')
const isLoggedIn = passport.isLoggedIn;

var User = require('../models/user');
var userController = require('../controllers/userController');
var Post = require('../models/post');
var postController = require('../controllers/postController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Member club'});
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
  userController.registerUser
);

router.get('/create-message', isLoggedIn, function(req, res, next) {
  res.render('create-message', { title: 'Create new message'});
});

router.post('/create-message', postController.createMessage);

router.post('/message/delete/:id', postController.deleteMessage);

module.exports = router;
