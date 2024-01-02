var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');



// var citiesRouter = require('./routes/cities');
// var cinemasRouter = require('./routes/cinemas');
// var multipleRouter = require('./routes/multiple_route');

var city_router = require('./api1/city/city_router');
var cinema_router = require('./api1/cinema/cinema_router')
var report_router = require('./api1/report/report_router')


var app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/cities', citiesRouter);
// app.use('/cinemas', cinemasRouter);
// app.use('/search',multipleRouter)

// const { login_user } = require('./api1/authenticate_api/authenticate_api_controller');

// app.use('/login', (req, res,next) => {
//     const { username, password } = req.query;
//     login_user(req, username, password, (success) => {

//       if (success) {
//         res.send('Login successful');
//       next();
//       } else {
//         res.status(401).send('Invalid username or password.');
//       }
//     });
//   });
app.use('/city', city_router);
app.use('/cinema',cinema_router)
app.use('/report',report_router)

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
