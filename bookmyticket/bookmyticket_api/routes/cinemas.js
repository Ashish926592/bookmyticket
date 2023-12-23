var express = require('express');
var router = express.Router();

let db = require('../database/db');
/* GET home page. */
router.get('/', function(req, res, next) {
  const query = 'select * from cinema;'

   db.query(query, (err,dbResponse)=>{
    if(!err){
      res.json(dbResponse.rows)
    }else{
      console.log(err.message);
    }

   });
 
});



router.post('/', (req, res, next) => {

  let code = req.body.code;
  let name = req.body.name;
  let city_id = req.body.city_id;
  let address = req.body.address;

  // {
  //   "code":"4004",
  //   "name":"PTR Cinema",
  //   "city_id":"20",
  //   "address":"Botad"
  // }


  if(code == null || name == null || city_id == null || address == null){
      res.status(404).send({ "insert":"Please enter a data"});
  }else{
 
  db.query(`INSERT INTO cinema(code,name,city_id,address) values ($1,$2,$3,$4)`, [code,name,city_id,address], (err, dbResponse) => {
      if (err) {
          console.log(err);
          res.send({ "insert": "failed to insert" });
      } else {
          res.send({ "insert": "sucessfully inserted" })
      }
    
  });

  }

});


  // {
  //   "code":"4004",
  //   "name":"PTR Cinema",
  //   "city_id":"20",
  //   "address":"Botad"
  // }
router.put('/update/:id', (req, res, next) => {

  let id = req.params.id;
  let code = req.body.code;
  let name = req.body.name;
  let city_id = req.body.city_id;
  let address = req.body.address;
  
  db.query(`UPDATE cinema SET code = $1 , name = $2,city_id = $3,address = $4 WHERE id =$5`,[code,name,city_id,address,id], (err, dbResponse)=> {
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
  db.query(`delete from cinema where id = $1`,[id], (err, dbResponse)=> {
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
