"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report10 = exports.report9 = exports.report8 = exports.report7 = exports.report6 = exports.report5 = exports.report4 = exports.report3 = exports.report2 = exports.report1 = void 0;
var db = require("./db");
// 1)As a customer I shall be able to view the list of movies showing in their city.
//Ahmedabad
// http://localhost:3000/report/city?city_name=Ahmedabad
exports.report1 = (function (city_name) {
    return new Promise(function (resolve, reject) {
        var query = " SELECT t1.name AS city_name,t5.name AS movie_name\n        FROM city AS t1\n        JOIN cinema AS t2 ON t1.id = t2.city_id\n        JOIN cinema_hall AS t3 ON t2.id = t3.cinema_id\n        JOIN show AS t4 ON t3.id = t4.cinema_hall_id\n        JOIN movie AS t5 ON t4.movie_id = t5.id \n        GROUP BY(t1.name,t5.name) \n        HAVING t1.name = $1\n        ORDER BY t1.name;";
        db.query(query, [city_name], function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found for the provided city" });
                }
                else {
                    resolve(dbResponse.rows);
                }
            }
        });
    });
});
//2) As a customer I shall be able to view the list of movies showing in the selected cinema hall.
//Screen 1
// http://localhost:3000/report/cinema_hall?cinema_hall=Screen+1
exports.report2 = (function (cinema_hall) {
    return new Promise(function (resolve, reject) {
        var query = "SELECT DISTINCT t1.name AS hall_name,t3.name AS movie_name,t2.time,t2.date\n    FROM cinema_hall AS t1 \n    JOIN show AS t2 ON t1.id = t2.cinema_hall_id\n    JOIN movie AS t3 ON t2.movie_id = t3.id\n    GROUP BY (t1.name,t3.name,t2.time,t2.date)\n    HAVING t1.name= $1\n    ORDER BY t1.name,t2.time;";
        db.query(query, [cinema_hall], function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found for the provided hall name" });
                }
                else {
                    resolve(dbResponse.rows);
                }
            }
        });
    });
});
//3) As a customer I shall be able to search a movie by name.
//Dangal
// http://localhost:3000/report/movie_name?movie_name=Dangal
exports.report3 = (function (movie_name) {
    return new Promise(function (resolve, reject) {
        var query = " SELECT * FROM movie WHERE name = $1";
        db.query(query, [movie_name], function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found for the provided movie name." });
                }
                else {
                    resolve(dbResponse.rows);
                }
            }
        });
    });
});
// 4)
// As a customer I shall be able to view the show seating plan for the selected city, movie,
// cinema, cinema hall, show so that I can book tickets.
// {
//     "city_name":"Ahmedabad",
//     "movie_name":"3 Idiots",
//     "cinema_name":"PTR Cinema",
//     "hall_name":"Screen 1",
//     "date":"2022-03-04"
//   }
// http://localhost:3000/report/seating_plan
exports.report4 = (function (city_name, movie_name, cinema_name, hall_name, date) {
    return new Promise(function (resolve, reject) {
        var query = "SELECT t1.name AS city_name,t2.name AS cinema_name,t3.name AS cinema_hall_name,\n    t4.name AS cinema_hall_section,t9.name AS movie_name,\n    t5.number AS seat_number,t6.status AS status,\n    t7.price AS movie_price,t8.date AS show_date,t8.time AS movie_time\n    FROM city AS t1\n    JOIN cinema AS t2 ON t1.id = t2.city_id\n    JOIN cinema_hall AS t3 ON t2.id = t3.cinema_id\n    JOIN cinema_hall_section AS t4 ON t3.id = t4.cinema_hall_id\n    JOIN seat AS t5 ON t4.id = t5.cinema_hall_section_id\n    JOIN show_seating_plan AS t6 ON t5.id = t6.seat_id\n    JOIN show_section AS t7 ON t6.show_section_id = t7.id\n    JOIN show AS t8 ON t7.show_id = t8.id\n    JOIN movie AS t9 ON t8.movie_id = t9.id\n    WHERE t1.name = $1 AND t9.name = $2 AND t2.name = $3 \n    AND t3.name = $4 AND t8.date = $5\n    ORDER BY t1.name,t9.name,t3.name,t8.time,t5.number";
        // console.log(movie_name, hall_name);
        db.query(query, [city_name, movie_name, cinema_name, hall_name, date], function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found." });
                }
                else {
                    resolve(dbResponse.rows);
                }
            }
        });
    });
});
// 5)
// As a customer I shall be able to view top 10 actors with maximum no. of movies.
// http://localhost:3000/report/top_ten_actor
exports.report5 = (function () {
    return new Promise(function (resolve, reject) {
        var query = "SELECT t1.name AS actor_name,count(t3.id) AS number_of_movie\n    FROM actor AS t1\n   JOIN movie_cast AS t2 ON t1.id = t2.actor_id\n   JOIN movie as t3 ON t2.movie_id = t3.id \n   GROUP BY t1.name\n   ORDER BY number_of_movie DESC LIMIT 10;";
        db.query(query, function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                resolve(dbResponse.rows);
            }
        });
    });
});
// 6)
// As a customer I shall be able to view the list of movies released in a selected year.
//2021
// http://localhost:3000/report/year?year=2021
exports.report6 = (function (year) {
    return new Promise(function (resolve, reject) {
        var query = " SELECT name, release_date\n        FROM movie\n        WHERE EXTRACT(YEAR FROM release_date) = $1;";
        db.query(query, [year], function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found for the provided year." });
                }
                else {
                    resolve(dbResponse.rows);
                }
            }
        });
    });
});
// 7)
// As a CEO of the multiplex chain I shall be able to view top 10 customers through which
// the multiplex chain has generated maximum revenues so that they can offer loyalty points
// to them.
// http://localhost:3000/report/top_ten_customers
exports.report7 = (function () {
    return new Promise(function (resolve, reject) {
        var query = " SELECT t8.name AS city_name,t7.name AS cinema_name,t1.name,SUM(t4.price) AS amount \n        FROM customer AS t1\n        JOIN booking AS t2 ON t1.id= t2.customer_id\n        JOIN show_seating_plan AS t3 ON t2.id = t3.booking_id\n        JOIN show_section AS t4 ON t3.show_section_id = t4.id\n        JOIN show AS t5 ON t4.show_id = t5.id\n        JOIN cinema_hall AS t6 ON t5.cinema_hall_id = t6.id\n        JOIN cinema AS t7 ON t6.cinema_id = t7.id\n        JOIN city AS t8 ON t7.city_id = t8.id\n        GROUP BY (t1.name,t7.name,t8.name)\n        ORDER BY amount DESC LIMIT 10";
        db.query(query, function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                resolve(dbResponse.rows);
            }
        });
    });
});
// 8)
// As a CEO of the multiplex chain I shall be able to view the cinema wise total no. of
// bookings.
// http://localhost:3000/report/no_of_booking
exports.report8 = (function () {
    return new Promise(function (resolve, reject) {
        var query = "SELECT \n        t8.name AS city_name,t7.name AS cinema_name,count(t8.id) AS no_of_booking\n        FROM booking AS t2\n        JOIN show_seating_plan AS t3 ON t2.id = t3.booking_id\n        JOIN show_section AS t4 ON t3.show_section_id = t4.id\n        JOIN show AS t5 ON t4.show_id = t5.id\n        JOIN cinema_hall AS t6 ON t5.cinema_hall_id = t6.id\n        JOIN cinema AS t7 ON t6.cinema_id = t7.id\n        JOIN city AS t8 ON t7.city_id = t8.id\n        GROUP BY (t7.name,t8.name,t3.status)";
        db.query(query, function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                resolve(dbResponse.rows);
            }
        });
    });
});
// 9)
// As a CEO of the multiplex chain I shall be able to view the unique customers who have
// booked tickets with the multiplex chain.
// http://localhost:3000/report/unique_customers
exports.report9 = (function () {
    return new Promise(function (resolve, reject) {
        var query = "SELECT t8.name AS city_name,t7.name AS cinema_name,\n        t1.name customer_name,COUNT(t2.id) AS count_number\n        FROM customer AS t1\n        JOIN booking AS t2 ON t1.id= t2.customer_id\n        JOIN show_seating_plan AS t3 ON t2.id = t3.booking_id\n        JOIN show_section AS t4 ON t3.show_section_id = t4.id\n        JOIN show AS t5 ON t4.show_id = t5.id\n        JOIN cinema_hall AS t6 ON t5.cinema_hall_id = t6.id\n        JOIN cinema AS t7 ON t6.cinema_id = t7.id\n        JOIN city AS t8 ON t7.city_id = t8.id\n        GROUP BY (t2.id,t1.name,t7.name,t8.name)\n        HAVING COUNT(t2.id) = 1\n        ORDER BY city_name";
        db.query(query, function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                resolve(dbResponse.rows);
            }
        });
    });
});
// 10)
// As a CEO of the multiplex chain I shall be able to customers who have booked tickets for
// the selected movie and selected cinema hall.
// http://localhost:3000/report/show_booking_ticket?movie_name=Unbroken&hall_name=Screen+1
exports.report10 = (function (movie_name, hall_name) {
    return new Promise(function (resolve, reject) {
        var query = "SELECT t6.name AS cinema_hall_name,t8.name AS movie_name,\n        t1.name AS customer_name\n        FROM customer AS t1\n        JOIN booking AS t2 ON t1.id= t2.customer_id\n        JOIN show_seating_plan AS t3 ON t2.id = t3.booking_id\n        JOIN seat AS t4 ON t3.seat_id = t4.id\n        JOIN cinema_hall_section AS t5 ON t4.cinema_hall_section_id = t5.id\n        JOIN cinema_hall AS t6 ON t5.cinema_hall_id = t6.id\n        JOIN show AS t7 ON t6.id = t7.cinema_hall_id\n        JOIN movie AS t8 ON t7.movie_id = t8.id\n        GROUP BY(t1.name,t6.name,t8.name)\n        HAVING t8.name = $1 and t6.name = $2";
        // console.log(movie_name, hall_name);
        db.query(query, [movie_name, hall_name], function (err, dbResponse) {
            if (err) {
                reject(err);
            }
            else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found." });
                }
                else {
                    resolve(dbResponse.rows);
                }
            }
        });
    });
});
