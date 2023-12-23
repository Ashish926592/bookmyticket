var express = require('express');
var router = express.Router();


var router_name = require('./report_controller');

router.get('/city', router_name.report_query1)
router.get('/cinema_hall', router_name.report_query2)
router.get('/movie_name', router_name.report_query3)
router.get('/seating_plan', router_name.report_query4)
router.get('/top_ten_actor', router_name.report_query5)
router.get('/year', router_name.report_query6)
router.get('/top_ten_customers', router_name.report_query7)
router.get('/no_of_booking', router_name.report_query8)
router.get('/unique_customers', router_name.report_query9)
router.get('/show_booking_ticket', router_name.report_query10)

module.exports = router;