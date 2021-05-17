var createError = require('http-errors');
var express = require('express');
const session = require("express-session");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var User = require('./models/user');

require('dotenv').config()

const mongoDb = process.env.DB_URL;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

passport.use(
    new LocalStrategy((email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
        if (err) { 
            return done(err);
        };
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
            console.log(password)
            console.log(user.password)
            if (res) {
              // passwords match! log user in
              return done(null, user)
            } else {
              // passwords do not match!
              return done(null, false, { message: "Incorrect password" })
            }
          })
        return done(null, user);
        });
    })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.post(
  "/login",
  passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/",
      failureFlash: true,
      successFlash: 'Welcome!'
  })
);

app.get("/logout", (req, res) => {
  console.log(req.session);
  req.logout();
  res.redirect("/");
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
