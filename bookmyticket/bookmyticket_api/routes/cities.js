var express = require('express');
var router = express.Router();

router.use(express.json());
let db = require('../database/db');
/* GET city data. */
router.get('/', function (req, res, next) {
    const query = 'Select * from city;'

    db.query(query, (err, dbResponse) => {
        if (!err) {
            res.json(dbResponse.rows)
        } else {
            console.log(err.message);
        }

    });

});

// router.post('/', (req, res, next) => {

//  let data = req.body;
//  let dbdata = [data.nam   
    //     "name": "Delhi1",
    //     "state": "Delhi2"
    // }e,data.state];

//     db.query('INSERT INTO city(name,state) values(?)',[dbdata], (err, dbResponse) => {
//         if (!err) {
//             res.json(dbResponse.rows)
//         } else {
//             console.log(err.message);
//         }

//     });


// });

router.post('/', (req, res, next) => {

    // let id=req.body.id;
    let name = req.body.name;
    let state = req.body.state;
    // console.log(dbjson);
    console.log(`INSERT INTO city(name,state) values (${name},${state}`)
    db.query(`INSERT INTO city(name,state) values ($1,$2)`,[name,state], (err, dbResponse)=> {
        if (err) {
            console.log(err);
            res.send({"insert":"failed to insert"});
        } else {
            res.send({"insert":"sucessfully inserted"})
        }
    });
});

module.exports = router;
