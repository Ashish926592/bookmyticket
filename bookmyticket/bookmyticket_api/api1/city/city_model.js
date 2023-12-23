const db = require('./db')

exports.get_city_data = ((res) => {
    db.query('Select * from city;', (err, dbResponse) => {
        if (!err) {
            res.json(dbResponse.rows);
            //  console.log(dbResponse.rows)
        } else {
            console.log(err.message);
        }

    });
})


exports.add_city_data = ((name, state, res) => {
    db.query(`INSERT INTO city(name,state) values ($1,$2)`, [name, state], (err, dbResponse) => {
        if (err) {
            console.log(err);
            res.send({ "insert": "failed to insert" });
        } else {
            res.send({ "insert": "sucessfully inserted" })
        }
    });

})


exports.update_city_data = ((name, state, id, res) => {
    db.query(`UPDATE city SET name = $1 , state = $2 WHERE id =$3`, [name, state, id], (err, dbResponse) => {
        if (err) {
            console.log(err);
            res.send({ "update": "failed to update" });
        } else {
            // Check if any rows were affected
            if (dbResponse.rowCount === 0) {
                res.status(404).send({ "update": "No matching record found for the provided ID" });
            } else {
                res.status(200).send({ "update": `Data updated for ID ${id}` });
            }
        }
    });

})


exports.delete_city_data = ((id, res) => {
    db.query(`delete from city where id = $1`, [id], (err, dbResponse) => {
        if (err) {
            console.log(err);
            res.send({ "delete": "failed to delete" });
        } else {
            if (dbResponse.rowCount === 0) {
                res.status(404).send({ "delete": "No matching record found for the provided ID" });
            } else {

                res.send({ "delete": "sucessfully deleted" });
            }
        }
    });
});
