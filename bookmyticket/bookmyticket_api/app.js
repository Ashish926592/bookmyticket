"use strict";
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
Object.defineProperty(exports, "__esModule", { value: true });
// var city_router = require('./api1/city/city_router');
// var cinema_router = require('./api1/cinema/cinema_router')
// var report_router = require('./api1/report/report_router')
// var authenticate_router = require('./api1/authenticate_api/authenticate_api_router')
// var app = express();
// const session = require('express-session');
// const RedisStore = connectRedis(session);
// const redisClient = redis.createClient({
//   host: 'localhost',
//   port: 6379
// })
// redisClient.on('error', function (err) {
//   console.log('Could not establish a connection with redis. ' + err);
// });
// redisClient.on('connect', function (err) {
//   console.log('Connected to redis successfully');
// });
// app.use(session({
//   store: new RedisStore({
//     client: redisClient
//   }),
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false, // if true only transmit cookie over https
//     httpOnly: false, // if true prevent client side JS from reading the cookie 
//     maxAge: 1000 * 60 * 10 // session max age in miliseconds
// }
// }));
// // app.use(session({
// //   secret: 'your-secret-key',
// //   resave: false,
// //   saveUninitialized: true
// // }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(logger('dev'));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// // app.use('/', indexRouter);
// // app.use('/cities', citiesRouter);
// // app.use('/cinemas', cinemasRouter);
// // app.use('/search',multipleRouter)
// const {authenticateSession} = require('./api1/authenticate_api/authenticate_api_middleware')
// app.use('/login',authenticate_router);
// app.use('/city',authenticateSession, city_router);
// app.use('/cinema',authenticateSession,cinema_router)
// app.use('/report',authenticateSession,report_router)
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// module.exports = app;
var authenticate_api_router_1 = require("./api1/authenticate_api/authenticate_api_router");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var redis = require("redis");
var RedisStore = require("connect-redis").default;
var authenticateSession = require('./api1/authenticate_api/authenticate_api_middleware').authenticateSession;
// app.set('trust proxy', 1);
// const RedisStore = connectRedis(session);
var redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});
redisClient.connect();
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});
var city_router = require('./api1/city/city_router');
var cinema_router = require('./api1/cinema/cinema_router');
var report_router = require('./api1/report/report_router');
var authenticate_router = require('./api1/authenticate_api/authenticate_api_router');
var app = express();
// Configure express-session to use connect-redis
app.use(session({
    store: new RedisStore({
        client: redisClient,
        ttl: 60,
    }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/login', authenticate_api_router_1.hello);
app.use('/city', authenticateSession, city_router);
app.use('/cinema', authenticateSession, cinema_router);
app.use('/report', authenticateSession, report_router);
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
