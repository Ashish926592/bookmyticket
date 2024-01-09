const PoolClass = require('pg').Pool;

const pool = new PoolClass({
  user:'postgres',
  host: 'localhost',
  database: 'bookmyticket',
  port:5432,
  password:'123456'

})

pool.connect((err)=>{
  if(err){
    console.log('connection error',err.stack);
  }else{
    console.log('connected successfully for api router');
  }
})

module.exports = {
    query:(queryText,params,callback)=>{
        return pool.query(queryText,params,callback)
    }
}