import { Router } from 'express';
import * as router_name from './cinema_controller';
import * as cinema_validator from './cinema_validator';
import { checkRole } from '../authenticate_api/authenticate_api_middleware';

const router = Router();

router.get('/',router_name.get_data)
router.post('/',checkRole('admin'),cinema_validator.validate_add_cinema,router_name.add_data)
router.put('/',checkRole('admin'),cinema_validator.validate_update_cinema,router_name.update_data)
router.delete('/',checkRole('admin'),cinema_validator.validate_delete_cinema,router_name.delete_data)


module.exports = router;