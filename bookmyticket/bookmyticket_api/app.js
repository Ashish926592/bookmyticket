"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authenticate_api_router_1 = require("./api1/authenticate_api/authenticate_api_router");
var authenticate_api_middleware_1 = require("./api1/authenticate_api/authenticate_api_middleware");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var redis = require("redis");
var RedisStore = require("connect-redis").default;
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
var app = express();
// Configure express-session to use connect-redis
app.use(session({
    store: new RedisStore({
        client: redisClient,
        ttl: 600,
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
app.use('/city', authenticate_api_middleware_1.authenticateSession, city_router);
app.use('/cinema', authenticate_api_middleware_1.authenticateSession, cinema_router);
app.use('/report', authenticate_api_middleware_1.authenticateSession, report_router);
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
