let { getUserByUsername } = require('./authenticate_api_model')

exports.login_user = ((req, username, password) => {
  return new Promise((resolve, reject) => {
    getUserByUsername(username)
      .then((user) => {
        if (user.length > 0 && user[0].password === password) {
          req.session.user = user;
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      })
  });

})



