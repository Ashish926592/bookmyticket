const db = require('./db');

exports.getUserByUsername = ((username, callback) => {

    const query = `SELECT * FROM users WHERE username = $1`;
    db.query(query, [username], (err, results) => {
        if (err) console.log(err);
        callback(results.rows);
    });
});


