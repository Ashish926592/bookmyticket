let { getUserByUsername } = require('./authenticate_api_model')

exports.login_user = ((req, username, password, callback) => {
  getUserByUsername(username, (user) => {
    
    if (user[0].password == password) {
      req.session.user = user;
      callback(true); 
    } else {
      callback(false);
    }
  });
});



