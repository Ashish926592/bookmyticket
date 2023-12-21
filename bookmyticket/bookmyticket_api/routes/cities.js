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


router.post('/', (req, res, next) => {

    // let id=req.body.id;
    let name = req.body.name;
    let state = req.body.state;


    if(name == null && state == null){
        res.status(404).send({ "insert":"Please enter a name and state"});
    }else{
            // console.log(dbjson);
    // console.log(`INSERT INTO city(name,state) values (${name},${state}`)
    db.query(`INSERT INTO city(name,state) values ($1,$2)`, [name, state], (err, dbResponse) => {
        if (err) {
            console.log(err);
            res.send({ "insert": "failed to insert" });
        } else {
            res.send({ "insert": "sucessfully inserted" })
        }
    });

    }

});


router.put('/update/:id', (req, res, next) => {

    let id = req.params.id;
    let name = req.body.name;
    let state = req.body.state;
  

    db.query(`UPDATE city SET name = $1 , state = $2 WHERE id =$3`,[name, state, id], (err, dbResponse)=> {
        if (err) {
            console.log(err);
            res.send({ "update": "failed to update" });
        }else {
            // Check if any rows were affected
            if (dbResponse.rowCount === 0) {
              res.status(404).send({ "update":"No matching record found for the provided ID"});
            } else {
              res.status(200).send({ "update":`Data updated for ID ${id}`});
            }
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    let id = req.params.id;
    console.log(id);
    db.query(`delete from city where id = $1`,[id], (err, dbResponse)=> {
        if (err) {
            console.log(err);
            res.send({"delete":"failed to delete"});
        } else {
            if (dbResponse.rowCount === 0) {
                res.status(404).send({ "delete":"No matching record found for the provided ID"});
              }else{

                res.send({"delete":"sucessfully deleted"});
            }
        }
    });

})


module.exports = router;


