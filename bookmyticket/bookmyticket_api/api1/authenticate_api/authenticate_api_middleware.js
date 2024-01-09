exports.authenticateSession = (req, res, next) => {
  
  if (req.session && req.session.user) {
      return next();
  } else {
      return res.status(401).send('Access denied. Not authenticated.');
  }
};


exports.checkRole = (role) => (req, res, next) => {
  // console.log(req.session.user);
  if (req.session.user && req.session.user[0].role === role) {
      return next();
  } else {
      return res.status(403).send('Access denied. Insufficient permissions.');
  }
};
