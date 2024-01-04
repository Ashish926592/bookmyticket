let model = require('./cinema_model')

exports.get_data = ('/', (req, res, next) => {
  model.get_cinema_data().then(response =>{
    res.json(response);
  }).catch(error =>{
    console.error(error);
  });
});


exports.add_data = ('/', (req, res, next) => {
  let { code,name,city_id,address } = req.query
  model.add_cinema_data(code,name,city_id,address, res).then(response =>{
    res.send(response)
  }).catch(error =>{
    console.error(error);
  });
});


exports.update_data = ('/', (req, res, next) => {
  let { code,name,city_id,address, id } = req.query
  model.update_cinema_data(code,name,city_id,address, id).then(response =>{
    res.send(response)
  }).catch(error =>{
    console.error(error);
  });
});

exports.delete_data = ('/', (req, res, next) => {
  let { id } = req.query;
  model.delete_cinema_data(id).then(response =>{
    res.send(response)
  }).catch(error =>{
    console.error(error);
  });
})


