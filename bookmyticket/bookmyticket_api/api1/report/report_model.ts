import * as db from './db';
// 1)As a customer I shall be able to view the list of movies showing in their city.
//Ahmedabad


// http://localhost:3000/report/city?city_name=Ahmedabad

export const report1 = ((city_name:string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = ` SELECT t1.name AS city_name,t5.name AS movie_name
        FROM city AS t1
        JOIN cinema AS t2 ON t1.id = t2.city_id
        JOIN cinema_hall AS t3 ON t2.id = t3.cinema_id
        JOIN show AS t4 ON t3.id = t4.cinema_hall_id
        JOIN movie AS t5 ON t4.movie_id = t5.id 
        GROUP BY(t1.name,t5.name) 
        HAVING t1.name = $1
        ORDER BY t1.name;`

        db.query(query, [city_name], (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found for the provided city" });
                } else {
                    resolve(dbResponse.rows)
                }
            }

        });
    });
})

//2) As a customer I shall be able to view the list of movies showing in the selected cinema hall.
//Screen 1


// http://localhost:3000/report/cinema_hall?cinema_hall=Screen+1

export const report2 = ((cinema_hall:string): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = `SELECT DISTINCT t1.name AS hall_name,t3.name AS movie_name,t2.time,t2.date
    FROM cinema_hall AS t1 
    JOIN show AS t2 ON t1.id = t2.cinema_hall_id
    JOIN movie AS t3 ON t2.movie_id = t3.id
    GROUP BY (t1.name,t3.name,t2.time,t2.date)
    HAVING t1.name= $1
    ORDER BY t1.name,t2.time;`
        db.query(query, [cinema_hall], (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found for the provided hall name" });
                } else {
                    resolve(dbResponse.rows);
                }
            }

        })
    });
})


//3) As a customer I shall be able to search a movie by name.
//Dangal

// http://localhost:3000/report/movie_name?movie_name=Dangal

export const report3 = ((movie_name:string): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = ` SELECT * FROM movie WHERE name = $1`
        db.query(query, [movie_name], (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found for the provided movie name." });
                } else {
                    resolve(dbResponse.rows);
                }
            }

        })
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

export const report4 = ((city_name:string, movie_name:string, cinema_name:string, hall_name:string, date:string): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = `SELECT t1.name AS city_name,t2.name AS cinema_name,t3.name AS cinema_hall_name,
    t4.name AS cinema_hall_section,t9.name AS movie_name,
    t5.number AS seat_number,t6.status AS status,
    t7.price AS movie_price,t8.date AS show_date,t8.time AS movie_time
    FROM city AS t1
    JOIN cinema AS t2 ON t1.id = t2.city_id
    JOIN cinema_hall AS t3 ON t2.id = t3.cinema_id
    JOIN cinema_hall_section AS t4 ON t3.id = t4.cinema_hall_id
    JOIN seat AS t5 ON t4.id = t5.cinema_hall_section_id
    JOIN show_seating_plan AS t6 ON t5.id = t6.seat_id
    JOIN show_section AS t7 ON t6.show_section_id = t7.id
    JOIN show AS t8 ON t7.show_id = t8.id
    JOIN movie AS t9 ON t8.movie_id = t9.id
    WHERE t1.name = $1 AND t9.name = $2 AND t2.name = $3 
    AND t3.name = $4 AND t8.date = $5
    ORDER BY t1.name,t9.name,t3.name,t8.time,t5.number`;

        // console.log(movie_name, hall_name);


        db.query(query, [city_name, movie_name, cinema_name, hall_name, date], (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found." });
                } else {
                    resolve(dbResponse.rows);
                }
            }
        });
    });

})


// 5)

// As a customer I shall be able to view top 10 actors with maximum no. of movies.

// http://localhost:3000/report/top_ten_actor

export const report5 = ((): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = `SELECT t1.name AS actor_name,count(t3.id) AS number_of_movie
    FROM actor AS t1
   JOIN movie_cast AS t2 ON t1.id = t2.actor_id
   JOIN movie as t3 ON t2.movie_id = t3.id 
   GROUP BY t1.name
   ORDER BY number_of_movie DESC LIMIT 10;`
        db.query(query, (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbResponse.rows);
            }

        })
    });
})

// 6)

// As a customer I shall be able to view the list of movies released in a selected year.
//2021

// http://localhost:3000/report/year?year=2021

export const report6 = ((year:number) : Promise<any>=> {
    return new Promise((resolve, reject) => {
        let query = ` SELECT name, release_date
        FROM movie
        WHERE EXTRACT(YEAR FROM release_date) = $1;`
        db.query(query, [year], (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found for the provided year." });
                } else {
                    resolve(dbResponse.rows);
                }
            }

        })
    });
})


// 7)
// As a CEO of the multiplex chain I shall be able to view top 10 customers through which
// the multiplex chain has generated maximum revenues so that they can offer loyalty points
// to them.

// http://localhost:3000/report/top_ten_customers

export const report7 = ((): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = ` SELECT t8.name AS city_name,t7.name AS cinema_name,t1.name,SUM(t4.price) AS amount 
        FROM customer AS t1
        JOIN booking AS t2 ON t1.id= t2.customer_id
        JOIN show_seating_plan AS t3 ON t2.id = t3.booking_id
        JOIN show_section AS t4 ON t3.show_section_id = t4.id
        JOIN show AS t5 ON t4.show_id = t5.id
        JOIN cinema_hall AS t6 ON t5.cinema_hall_id = t6.id
        JOIN cinema AS t7 ON t6.cinema_id = t7.id
        JOIN city AS t8 ON t7.city_id = t8.id
        GROUP BY (t1.name,t7.name,t8.name)
        ORDER BY amount DESC LIMIT 10`
        db.query(query, (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbResponse.rows);
            }

        })
    });
})


// 8)
// As a CEO of the multiplex chain I shall be able to view the cinema wise total no. of
// bookings.

// http://localhost:3000/report/no_of_booking

export const report8 = ((): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = `SELECT 
        t8.name AS city_name,t7.name AS cinema_name,count(t8.id) AS no_of_booking
        FROM booking AS t2
        JOIN show_seating_plan AS t3 ON t2.id = t3.booking_id
        JOIN show_section AS t4 ON t3.show_section_id = t4.id
        JOIN show AS t5 ON t4.show_id = t5.id
        JOIN cinema_hall AS t6 ON t5.cinema_hall_id = t6.id
        JOIN cinema AS t7 ON t6.cinema_id = t7.id
        JOIN city AS t8 ON t7.city_id = t8.id
        GROUP BY (t7.name,t8.name,t3.status)`
        db.query(query, (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbResponse.rows);
            }

        })
    });

})

// 9)

// As a CEO of the multiplex chain I shall be able to view the unique customers who have
// booked tickets with the multiplex chain.

// http://localhost:3000/report/unique_customers

export const report9 = ((): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = `SELECT t8.name AS city_name,t7.name AS cinema_name,
        t1.name customer_name,COUNT(t2.id) AS count_number
        FROM customer AS t1
        JOIN booking AS t2 ON t1.id= t2.customer_id
        JOIN show_seating_plan AS t3 ON t2.id = t3.booking_id
        JOIN show_section AS t4 ON t3.show_section_id = t4.id
        JOIN show AS t5 ON t4.show_id = t5.id
        JOIN cinema_hall AS t6 ON t5.cinema_hall_id = t6.id
        JOIN cinema AS t7 ON t6.cinema_id = t7.id
        JOIN city AS t8 ON t7.city_id = t8.id
        GROUP BY (t2.id,t1.name,t7.name,t8.name)
        HAVING COUNT(t2.id) = 1
        ORDER BY city_name`
        db.query(query, (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                resolve(dbResponse.rows);
            }

        })
    });
})

// 10)

// As a CEO of the multiplex chain I shall be able to customers who have booked tickets for
// the selected movie and selected cinema hall.

// http://localhost:3000/report/show_booking_ticket?movie_name=Unbroken&hall_name=Screen+1

export const report10 = ((movie_name:string, hall_name:string): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = `SELECT t6.name AS cinema_hall_name,t8.name AS movie_name,
        t1.name AS customer_name
        FROM customer AS t1
        JOIN booking AS t2 ON t1.id= t2.customer_id
        JOIN show_seating_plan AS t3 ON t2.id = t3.booking_id
        JOIN seat AS t4 ON t3.seat_id = t4.id
        JOIN cinema_hall_section AS t5 ON t4.cinema_hall_section_id = t5.id
        JOIN cinema_hall AS t6 ON t5.cinema_hall_id = t6.id
        JOIN show AS t7 ON t6.id = t7.cinema_hall_id
        JOIN movie AS t8 ON t7.movie_id = t8.id
        GROUP BY(t1.name,t6.name,t8.name)
        HAVING t8.name = $1 and t6.name = $2`;

        // console.log(movie_name, hall_name);


        db.query(query, [movie_name, hall_name], (err:Error, dbResponse) => {
            if (err) {
                reject(err);
            } else {
                if (dbResponse.rows.length === 0) {
                    reject({ "data": "No matching record found." });
                } else {
                    resolve(dbResponse.rows);
                }
            }
        });

    });
})


