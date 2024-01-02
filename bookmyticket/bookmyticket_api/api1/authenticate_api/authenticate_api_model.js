const db = require('./db');

exports.getUserByUsername = ((username, callback) => {

    const query = `SELECT * FROM users WHERE username = $1`;
    db.query(query, [username], (err, results) => {
        // console.log(query,[username])
        if (err) console.log(err);
        // console.log(results[0]);
        // console.log(results.rows);
        callback(results.rows);
    });
});


