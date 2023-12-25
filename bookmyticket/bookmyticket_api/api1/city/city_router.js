var express = require('express');
var router = express.Router();


var router_name = require('../city/city_controller');

var city_validator = require('./city_validator')

router.get('/',router_name.get_data)
router.post('/',city_validator.validate_add_city,router_name.add_data)
router.put('/',city_validator.validate_update_city,router_name.update_data)
router.delete('/',city_validator.validate_delete_city,router_name.delete_data)


module.exports = router;