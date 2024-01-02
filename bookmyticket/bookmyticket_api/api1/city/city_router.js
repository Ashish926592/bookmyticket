var express = require('express');
var router = express.Router();

var router_name = require('../city/city_controller');

var city_validator = require('./city_validator');
// const { authenticateSession, checkRole } = require('../authenticate_api/authenticate_api_middleware');

const { login_user } = require('../authenticate_api/authenticate_api_controller');

router.post('/login', (req, res,next) => {
    const { username, password } = req.body;
    login_user(req, username, password, (success) => {

      if (success) {
        res.send('Login successful');
      next();
      } else {
        res.status(401).send('Invalid username or password.');
      }
    });
  });

const authenticateSession = (req, res, next) => {
  console.log(req.session);
  if (req.session && req.session.user) {
      return next();
  } else {
      return res.status(401).send('Access denied. Not authenticated.');
  }
};

const checkRole = (role) => (req, res, next) => {
  if (req.session.user && req.session.user.role === role) {
      return next();
  } else {
      return res.status(403).send('Access denied. Insufficient permissions.');
  }
};

router.get('/',router_name.get_data)
router.post('/',checkRole('admin'),authenticateSession, city_validator.validate_add_city,router_name.add_data)
router.put('/',authenticateSession, checkRole('admin'),city_validator.validate_update_city,router_name.update_data)
router.delete('/',authenticateSession, checkRole('admin'),city_validator.validate_delete_city,router_name.delete_data)

module.exports = router;