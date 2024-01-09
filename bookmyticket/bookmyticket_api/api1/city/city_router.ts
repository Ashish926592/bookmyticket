import { Router } from 'express';
import * as router_name from '../city/city_controller';
import * as city_validator from './city_validator';
import { checkRole } from '../authenticate_api/authenticate_api_middleware';

const router = Router();

router.get('/',router_name.get_data)
router.post('/',checkRole('admin'), city_validator.validate_add_city,router_name.add_data)
router.put('/',checkRole('admin'),city_validator.validate_update_city,router_name.update_data)
router.delete('/',checkRole('admin'),city_validator.validate_delete_city,router_name.delete_data)

module.exports = router;