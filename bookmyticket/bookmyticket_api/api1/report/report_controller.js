"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report_query10 = exports.report_query9 = exports.report_query8 = exports.report_query7 = exports.report_query6 = exports.report_query5 = exports.report_query4 = exports.report_query3 = exports.report_query2 = exports.report_query1 = void 0;
var model = require("./report_model");
exports.report_query1 = (function (req, res) {
    var city_name = req.query.city_name;
    if (city_name) {
        model.report1(city_name).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.status(400).send('Bad Request: Missing required parameters');
    }
});
exports.report_query2 = (function (req, res, next) {
    var cinema_hall = req.query.cinema_hall;
    if (cinema_hall) {
        model.report2(cinema_hall).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.status(400).send('Bad Request: Missing required parameters');
    }
});
exports.report_query3 = (function (req, res, next) {
    var movie_name = req.query.movie_name;
    if (movie_name) {
        model.report3(movie_name).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.status(400).send('Bad Request: Missing required parameters');
    }
});
exports.report_query4 = (function (req, res, next) {
    var _a = req.body, city_name = _a.city_name, movie_name = _a.movie_name, cinema_name = _a.cinema_name, hall_name = _a.hall_name, date = _a.date;
    if (city_name && cinema_name && movie_name && hall_name && date) {
        model.report4(city_name, movie_name, cinema_name, hall_name, date).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.status(400).send('Bad Request: Missing required parameters');
    }
    // console.log(city_name, movie_name, cinema_name, hall_name, date);
});
exports.report_query5 = (function (req, res) {
    model.report5().then(function (response) {
        res.json(response);
    }).catch(function (error) {
        console.error(error);
    });
});
exports.report_query6 = (function (req, res) {
    var year = req.query.year;
    if (year) {
        model.report6(year).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.status(400).send('Bad Request: Missing required parameters');
    }
});
exports.report_query7 = (function (req, res) {
    model.report7().then(function (response) {
        res.json(response);
    }).catch(function (error) {
        console.error(error);
    });
});
exports.report_query8 = (function (req, res) {
    model.report8().then(function (response) {
        res.json(response);
    }).catch(function (error) {
        console.error(error);
    });
});
exports.report_query9 = (function (req, res) {
    model.report9().then(function (response) {
        res.json(response);
    }).catch(function (error) {
        console.error(error);
    });
});
exports.report_query10 = (function (req, res) {
    var _a = req.query, movie_name = _a.movie_name, hall_name = _a.hall_name;
    if (movie_name && hall_name) {
        model.report10(movie_name, hall_name).then(function (response) {
            res.json(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
    else {
        res.status(400).send('Bad Request: Missing required parameters');
    }
});
