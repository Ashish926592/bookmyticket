var express = require('express');
var router = express.Router();

var router_name = require('../city/city_controller');

var city_validator = require('./city_validator');
// const { authenticateSession, checkRole } = require('../authenticate_api/authenticate_api_middleware');
var {checkRole} = require('../authenticate_api/authenticate_api_middleware');

router.get('/',router_name.get_data)
router.post('/',checkRole('admin'), city_validator.validate_add_city,router_name.add_data)
router.put('/',checkRole('admin'),city_validator.validate_update_city,router_name.update_data)
router.delete('/',checkRole('admin'),city_validator.validate_delete_city,router_name.delete_data)

module.exports = router;