var express = require('express');
var router = express.Router();


var router_name = require('./cinema_controller');
var cinema_validator = require('./cinema_validator')
var {checkRole} = require('../authenticate_api/authenticate_api_middleware');


router.get('/',router_name.get_data)
router.post('/',checkRole('admin'),cinema_validator.validate_add_cinema,router_name.add_data)
router.put('/',checkRole('admin'),cinema_validator.validate_update_cinema,router_name.update_data)
router.delete('/',checkRole('admin'),cinema_validator.validate_delete_cinema,router_name.delete_data)


module.exports = router;