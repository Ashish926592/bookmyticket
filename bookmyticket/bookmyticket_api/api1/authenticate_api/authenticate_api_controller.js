let { getUserByUsername } = require('./authenticate_api_model')

exports.login_user = ((req, username, password, callback) => {
  getUserByUsername(username, (user) => {
    // console.log((user[0].password))
    // console.log(password);
    // console.log(user.password == password);
    if (user[0].password == password) {
      req.session.user = user;
      callback(true); // Authentication successful
    } else {
      callback(false); // Authentication failed
    }
  });
});



