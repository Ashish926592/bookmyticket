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

module.exports = router;
