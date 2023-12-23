var express = require('express');
var router = express.Router();


var router_name = require('./cinema_controller');


router.get('/',router_name.get_data)
router.post('/',router_name.add_data)
router.put('/',router_name.update_data)
router.delete('/',router_name.delete_data)


module.exports = router;