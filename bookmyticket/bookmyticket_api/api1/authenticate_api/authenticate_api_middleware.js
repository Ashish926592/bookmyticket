exports.authenticateSession = (req, res, next) => {
  
  if (req.session && req.session.user) {
      return next();
  } else {
    return next(new Error('Access denied. Not authenticated.'));
  }
};


exports.checkRole = (role) => (req, res, next) => {
  // console.log(req.session.user);
  if (req.session.user && req.session.user[0].role === role) {
      return next();
  } else {
    return next(new Error('Access denied. Insufficient permissions.'));
  }
};
