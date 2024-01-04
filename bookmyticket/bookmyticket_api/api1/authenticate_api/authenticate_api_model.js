const db = require('./db');

exports.getUserByUsername = (username) =>{
    return new Promise((resolve, reject) =>{
        const query = `SELECT * FROM users WHERE username = $1`;
        db.query(query,[username],(err, results) =>{
            if(err){
                reject(err);
            }else{
                resolve(results.rows);
            }
        });

    })
}


