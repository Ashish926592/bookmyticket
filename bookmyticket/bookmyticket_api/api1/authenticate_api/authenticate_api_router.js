
var express = require('express');
var router = express.Router();
const { login_user } = require('./authenticate_api_controller');


router.post('/', (req, res, next) => {
  const { username, password } = req.body;

  login_user(req, username, password)
      .then((success) => {
          if (success) {
              res.send('Login successful');
              next();
          } else {
              res.status(401).send('Invalid username or password.');
          }
      })
      .catch((error) => {
          console.error(error);
          res.status(500).send('Internal Server Error');
      });
});



module.exports = router;



