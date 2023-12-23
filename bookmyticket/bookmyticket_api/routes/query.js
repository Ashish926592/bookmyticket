// 1)
// SELECT t1.name as city_name,t5.name as movie_name,t2.address as cinema_address
// FROM city AS t1
// JOIN cinema AS t2 ON t1.id = t2.city_id
// JOIN cinema_hall AS t3 ON t2.id = t3.cinema_id
// JOIN show AS t4 ON t3.id = t4.cinema_hall_id
// JOIN movie AS t5 ON t4.movie_id = t5.id order by t1.name;

// 2)

// -- SELECT t0.name as name_hall,t3.name as movie_name
// -- FROM cinema as t0
// -- JOIN cinema_hall as t1 ON t0.id = t1.cinema_id
// -- JOIN show as t2 ON t1.id = t2.cinema_hall_id
// -- JOIN movie as t3 on t2.movie_id = t3.id;

// 3)
// select name from movie where name = 'Shikara'

// 4)

// SELECT t1.name as city_name,t2.name as cinema_name,t9.name as movie_name,
// t3.name as cinema_hall_name,t5.number as seat_number,t6.status as status,t7.price as movie_price,
// t8.time as movie_time
// FROM city AS t1
// JOIN cinema AS t2 ON t1.id = t2.city_id
// JOIN cinema_hall AS t3 ON t2.id = t3.cinema_id
// JOIN cinema_hall_section AS t4 ON t3.id = t4.cinema_hall_id
// JOIN seat AS t5 ON t4.id = t5.cinema_hall_section_id
// JOIN show_seating_plan AS t6 ON t5.id = t6.seat_id
// JOIN show_section AS t7 ON t6.show_section_id = t7.id
// JOIN show AS t8 ON t7.show_id = t8.id
// JOIN movie AS t9 ON t8.movie_id = t9.id
// order by t1.name,t9.name,t3.name,t8.time,t5.number

//5)
// As a customer I shall be able to view top 10 actors with maximum no. of movies.

// select t1.name as actor_name,count(t3.id) as number_of_movie from actor as t1
// join movie_cast as t2 on t1.id = t2.actor_id
// join movie as t3 on t2.movie_id = t3.id group by t1.name order by number_of_movie desc limit 10;

//6)
// As a customer I shall be able to view the list of movies released in a selected year

// SELECT name, release_date
// FROM movie
// WHERE EXTRACT(YEAR FROM release_date) = 2021;

//7)
// As a CEO of the multiplex chain I shall be able to view top 10 customers through which
// the multiplex chain has generated maximum revenues so that they can offer loyalty points
// to them.

// select t8.name as city_name,t7.name as cinema_name,t1.name,sum(t4.price) as price 
// from customer as t1
// join booking as t2 on t1.id= t2.customer_id
// join show_seating_plan as t3 on t2.id = t3.booking_id
// join show_section as t4 on t3.show_section_id = t4.id
// join show as t5 on t4.show_id = t5.id
// join cinema_hall as t6 on t5.cinema_hall_id = t6.id
// join cinema as t7 on t6.cinema_id = t7.id
// join city as t8 on t7.city_id = t8.id
// group by (t1.name,t7.name,t8.name)
// order by price desc limit 10

// 8)
//As a CEO of the multiplex chain I shall be able to view the cinema wise total no. of
// bookings.

// select 
// t8.name as city_name,t7.name as cinema_name,count(t8.id) as no_of_booking
// from booking as t2
// join show_seating_plan as t3 on t2.id = t3.booking_id
// join show_section as t4 on t3.show_section_id = t4.id
// join show as t5 on t4.show_id = t5.id
// join cinema_hall as t6 on t5.cinema_hall_id = t6.id
// join cinema as t7 on t6.cinema_id = t7.id
// join city as t8 on t7.city_id = t8.id
// group by (t7.name,t8.name,t3.status)

// 9)
// As a CEO of the multiplex chain I shall be able to view the unique customers who have
// booked tickets with the multiplex chain.

// select t8.name as city_name,t7.name as cinema_name,t1.name customer_name,count(t2.id) as count_number
// from customer as t1
// join booking as t2 on t1.id= t2.customer_id
// join show_seating_plan as t3 on t2.id = t3.booking_id
// join show_section as t4 on t3.show_section_id = t4.id
// join show as t5 on t4.show_id = t5.id
// join cinema_hall as t6 on t5.cinema_hall_id = t6.id
// join cinema as t7 on t6.cinema_id = t7.id
// join city as t8 on t7.city_id = t8.id
// group by (t2.id,t1.name,t7.name,t8.name)
// having count(t2.id) = 1

// 10)
// As a CEO of the multiplex chain I shall be able to customers who have booked tickets for
// the selected movie and selected cinema hall.

// select t6.name as cinema_hall_name,t8.name as movie_name,t1.name as customer_name
// from customer as t1
// join booking as t2 on t1.id= t2.customer_id
// join show_seating_plan as t3 on t2.id = t3.booking_id
// join seat as t4 on t3.seat_id = t4.id
// join cinema_hall_section as t5 on t4.cinema_hall_section_id = t5.id
// join cinema_hall as t6 on t5.cinema_hall_id = t6.id
// join show as t7 on t6.id = t7.cinema_hall_id
// join movie as t8 on t7.movie_id = t8.id
// group by(t1.name,t6.name,t8.name)
// having t1.name = 'Harrison Wiggins'

