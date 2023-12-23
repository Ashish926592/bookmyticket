const db = require('./db');

// 1)As a customer I shall be able to view the list of movies showing in their city.
//Ahmedabad


// http://localhost:3000/report/city?city_name=Ahmedabad

exports.report1 = ((city_name, res) => {

    const query = ` SELECT t1.name as city_name,t5.name as movie_name
    FROM city AS t1
    JOIN cinema AS t2 ON t1.id = t2.city_id
    JOIN cinema_hall AS t3 ON t2.id = t3.cinema_id
    JOIN show AS t4 ON t3.id = t4.cinema_hall_id
    JOIN movie AS t5 ON t4.movie_id = t5.id 
    group by(t1.name,t5.name) 
    having t1.name = $1
    order by t1.name;`

    db.query(query, [city_name], (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            if (dbResponse.rows.length === 0) {
                res.status(404).send({ "data": "No matching record found for the provided city" });
            } else {
                res.json(dbResponse.rows)
            }
        }

    });
})

//2) As a customer I shall be able to view the list of movies showing in the selected cinema hall.
//Screen 1


// http://localhost:3000/report/cinema_hall?cinema_hall=Screen+1

exports.report2 = ((cinema_hall, res) => {

    let query = `SELECT distinct t1.name as hall_name,t3.name as movie_name,t2.time,t2.date
    FROM cinema_hall as t1 
    JOIN show as t2 ON t1.id = t2.cinema_hall_id
    JOIN movie as t3 on t2.movie_id = t3.id
    group by (t1.name,t3.name,t2.time,t2.date)
    having t1.name= $1
    order by t1.name,t2.time;`
    db.query(query, [cinema_hall], (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            if (dbResponse.rows.length === 0) {
                res.status(404).send({ "data": "No matching record found for the provided hall name" });
            } else {
                res.json(dbResponse.rows);
            }
        }

    })

})


//3) As a customer I shall be able to search a movie by name.
//Dangal

// http://localhost:3000/report/movie_name?movie_name=Dangal

exports.report3 = ((movie_name, res) => {
    let query = ` select * from movie where name = $1`
    db.query(query, [movie_name], (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            if (dbResponse.rows.length === 0) {
                res.status(404).send({ "data": "No matching record found for the provided movie name." });
            } else {
                res.json(dbResponse.rows);
            }
        }

    })

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

exports.report4 = ((city_name, movie_name, cinema_name, hall_name, date, res) => {

    let query = `SELECT t1.name as city_name,t2.name as cinema_name,t3.name as cinema_hall_name,
    t4.name as cinema_hall_section,t9.name as movie_name,
    t5.number as seat_number,t6.status as status,
    t7.price as movie_price,t8.date as show_date,t8.time as movie_time
    FROM city AS t1
    JOIN cinema AS t2 ON t1.id = t2.city_id
    JOIN cinema_hall AS t3 ON t2.id = t3.cinema_id
    JOIN cinema_hall_section AS t4 ON t3.id = t4.cinema_hall_id
    JOIN seat AS t5 ON t4.id = t5.cinema_hall_section_id
    JOIN show_seating_plan AS t6 ON t5.id = t6.seat_id
    JOIN show_section AS t7 ON t6.show_section_id = t7.id
    JOIN show AS t8 ON t7.show_id = t8.id
    JOIN movie AS t9 ON t8.movie_id = t9.id
    where t1.name = $1 and t9.name = $2 and t2.name = $3 
    and t3.name = $4 and t8.date = $5
    order by t1.name,t9.name,t3.name,t8.time,t5.number`;

    // console.log(movie_name, hall_name);

    if (movie_name == null && hall_name == null) {
        res.status(404).send({ "required": "Please enter a movie_name and hall_name" });
    } else {
        db.query(query, [city_name, movie_name, cinema_name, hall_name, date], (err, dbResponse) => {
            if (err) {
                console.log(err);
            } else {
                if (dbResponse.rows.length === 0) {
                    res.status(404).send({ "data": "No matching record found." });
                } else {
                    res.json(dbResponse.rows);
                }
            }
        });

    }

})


// 5)

// As a customer I shall be able to view top 10 actors with maximum no. of movies.

// http://localhost:3000/report/top_ten_actor

exports.report5 = ((res) => {

    let query = `select t1.name as actor_name,count(t3.id) as number_of_movie
    from actor as t1
   join movie_cast as t2 on t1.id = t2.actor_id
   join movie as t3 on t2.movie_id = t3.id 
   group by t1.name
    order by number_of_movie desc limit 10;`
    db.query(query, (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            res.json(dbResponse.rows);
        }

    })

})

// 6)

// As a customer I shall be able to view the list of movies released in a selected year.
//2021

// http://localhost:3000/report/year?year=2021

exports.report6 = ((year, res) => {
    let query = ` SELECT name, release_date
    FROM movie
    WHERE EXTRACT(YEAR FROM release_date) = $1;`
    db.query(query, [year], (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            if (dbResponse.rows.length === 0) {
                res.status(404).send({ "data": "No matching record found for the provided year." });
            } else {
                res.json(dbResponse.rows);
            }
        }

    })

})


// 7)
// As a CEO of the multiplex chain I shall be able to view top 10 customers through which
// the multiplex chain has generated maximum revenues so that they can offer loyalty points
// to them.

exports.report7 = ((res) => {
    let query = ` select t8.name as city_name,t7.name as cinema_name,t1.name,sum(t4.price) as amount 
    from customer as t1
    join booking as t2 on t1.id= t2.customer_id
    join show_seating_plan as t3 on t2.id = t3.booking_id
    join show_section as t4 on t3.show_section_id = t4.id
    join show as t5 on t4.show_id = t5.id
    join cinema_hall as t6 on t5.cinema_hall_id = t6.id
    join cinema as t7 on t6.cinema_id = t7.id
    join city as t8 on t7.city_id = t8.id
    group by (t1.name,t7.name,t8.name)
    order by amount desc limit 10`
    db.query(query, (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            res.json(dbResponse.rows);
        }

    })

})


// 8)
// As a CEO of the multiplex chain I shall be able to view the cinema wise total no. of
// bookings.

exports.report8 = ((res) => {

    let query = `select 
    t8.name as city_name,t7.name as cinema_name,count(t8.id) as no_of_booking
    from booking as t2
    join show_seating_plan as t3 on t2.id = t3.booking_id
    join show_section as t4 on t3.show_section_id = t4.id
    join show as t5 on t4.show_id = t5.id
    join cinema_hall as t6 on t5.cinema_hall_id = t6.id
    join cinema as t7 on t6.cinema_id = t7.id
    join city as t8 on t7.city_id = t8.id
    group by (t7.name,t8.name,t3.status)`
    db.query(query, (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            res.json(dbResponse.rows);
        }

    })

})

// 9)

// As a CEO of the multiplex chain I shall be able to view the unique customers who have
// booked tickets with the multiplex chain.

exports.report9 = ((res) => {
    let query = `select t8.name as city_name,t7.name as cinema_name,t1.name customer_name,count(t2.id) as count_number
    from customer as t1
    join booking as t2 on t1.id= t2.customer_id
    join show_seating_plan as t3 on t2.id = t3.booking_id
    join show_section as t4 on t3.show_section_id = t4.id
    join show as t5 on t4.show_id = t5.id
    join cinema_hall as t6 on t5.cinema_hall_id = t6.id
    join cinema as t7 on t6.cinema_id = t7.id
    join city as t8 on t7.city_id = t8.id
    group by (t2.id,t1.name,t7.name,t8.name)
    having count(t2.id) = 1
    order by city_name`
    db.query(query, (err, dbResponse) => {
        if (err) {
            console.log(err);
        } else {
            res.json(dbResponse.rows);
        }

    })

})

// 10)

// As a CEO of the multiplex chain I shall be able to customers who have booked tickets for
// the selected movie and selected cinema hall.

// http://localhost:3000/report/show_booking_ticket?movie_name=Unbroken&hall_name=Screen+1

exports.report10 = ((movie_name, hall_name, res) => {

    let query = `select t6.name as cinema_hall_name,t8.name as movie_name,
t1.name as customer_name
from customer as t1
join booking as t2 on t1.id= t2.customer_id
join show_seating_plan as t3 on t2.id = t3.booking_id
join seat as t4 on t3.seat_id = t4.id
join cinema_hall_section as t5 on t4.cinema_hall_section_id = t5.id
join cinema_hall as t6 on t5.cinema_hall_id = t6.id
join show as t7 on t6.id = t7.cinema_hall_id
join movie as t8 on t7.movie_id = t8.id
group by(t1.name,t6.name,t8.name)
having t8.name = $1 and t6.name = $2`;

    // console.log(movie_name, hall_name);

    if (movie_name == null && hall_name == null) {
        res.status(404).send({ "required": "Please enter a movie_name and hall_name" });
    } else {
        db.query(query, [movie_name, hall_name], (err, dbResponse) => {
            if (err) {
                console.log(err);
            } else {
                if (dbResponse.rows.length === 0) {
                    res.status(404).send({ "data": "No matching record found." });
                } else {
                    res.json(dbResponse.rows);
                }
            }
        });

    }

})


