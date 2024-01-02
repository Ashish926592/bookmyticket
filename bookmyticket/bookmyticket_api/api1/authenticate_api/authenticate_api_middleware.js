
// exports.authenticateSession = (req, res, next) => {
//     console.log(req.session);
//     if (req.session && req.session.user) {
//         return next();
//     } else {
//         return res.status(401).send('Access denied. Not authenticated.');
//     }
// };

// exports.checkRole = (role) => (req, res, next) => {
//     if (req.session.user && req.session.user.role === role) {
//         return next();
//     } else {
//         return res.status(403).send('Access denied. Insufficient permissions.');
//     }
// };




