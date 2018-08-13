const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/** brings in data model - takes a while to process connection */
require('./app_api/models/db');
/** brings in the passport config */
require('./app_api/config/passport');


// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');

const apiRouter = require('./app_api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** initialize passport before using the route middleware */
app.use(passport.initialize());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// server app_public folder as a static folder
app.use(express.static(path.join(__dirname, 'app_public', 'build')));
// app.use(express.static(path.join(__dirname, 'app_public')));

// allowing cross-origin requests
app.use('/api', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/api', apiRouter);

// serve anything that wasn't matched with regular expressions
// app.get(/(\/about)|(\/pitches\/[a-z0-9]{24})|(\/players\/[a-z0-9]{24})/, function(req, res, next) {
//   res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
// })
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

// catches unauthorized errors
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({
        "message": err.name + ": " + err.message
      });
  }
});

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
