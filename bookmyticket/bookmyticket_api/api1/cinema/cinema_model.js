const db = require('./db')

exports.get_cinema_data = ((res) => {
    db.query('select * from cinema;', (err,dbResponse)=>{
        if(!err){
          res.json(dbResponse.rows)
        }else{
          console.log(err.message);
        }
    
       });
     
})


exports.add_cinema_data = ((code,name,city_id,address, res) => {
    db.query(`INSERT INTO cinema(code,name,city_id,address) values ($1,$2,$3,$4)`, [code,name,city_id,address], (err, dbResponse) => {
        if (err) {
            console.log(err);
            res.send({ "insert": "failed to insert" });
        } else {
            res.send({ "insert": "sucessfully inserted" })
        }
      
    });
})


exports.update_cinema_data = ((code,name,city_id,address, id, res) => {
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
  
})


exports.delete_cinema_data = ((id, res) => {
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
  
});


  
    
  
  
  

  
  
   

  

  
  
  

  

 
  
