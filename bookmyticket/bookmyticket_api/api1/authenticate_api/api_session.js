// const express = require('express');
// const session = require('express-session');
// const db = require('./db');

// const router = express.Router();

// router.use(express.json()); 
// router.use(express.urlencoded({ extended: true }));


// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     role VARCHAR(255) NOT NULL,
//     username VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL
//   );
  
//   INSERT INTO users (role, username, password) VALUES
//     ('admin', 'admin_user', '123456'),
//     ('user', 'normal_user', '123456');


// router.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false,
//   }));


//   router.post('/login',(req, res, next) =>{
//     const {username, password} = req.query;

//     const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

//     db.query(query, [username, password], (err, results) => {
//       if (err || results.length === 0) {
//         return res.status(401).send('Invalid username or password.');
//       }
  
//       const user = results[0];
//       req.session.user = user;
//       res.send('Login successful');
//     });
//   })
  

//   const authenticateSession = (req, res, next) => {
//     if (req.session && req.session.user) {
//       return next();
//     } else {
//       return res.status(401).send('Access denied. Not authenticated.');
//     }
//   };

//   const checkRole = (role) => (req, res, next) => {
//     if (req.session.user && req.session.user.role === role) {
//       return next();
//     } else {
//       return res.status(403).send('Access denied. Insufficient permissions.');
//     }
//   };

// router.get('/public-route', (req, res) => {
//     res.send('This is a public route.');
//   });
  
//   router.get('/admin-route', checkRole('admin'), (req, res) => {
//     res.send('This is an admin route.');
//   });
  
//   router.get('/user-route', checkRole('user'), (req, res) => {
//     res.send('This is a user route.');
//   });
  
  
  // router.use(authenticateSession);


