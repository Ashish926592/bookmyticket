const mysql = require('mysql')
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'bookmyticket'
})


pool.connect((err)=>{
  if(err){
    console.log('connection error',err.stack);
  }else{
    console.log('connected successfully for API router');
  }
})

module.exports = {
    query:(queryText,params,callback)=>{
        return pool.query(queryText,params,callback)
    }
}
