var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Member club' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register profile' });
});

router.post('/register', function(req, res, next) {
  res.send('Form posted');
});

module.exports = router;
