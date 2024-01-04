let model = require('./city_model')

exports.get_data = ('/', (req, res, next) => {
  model.get_city_data().then(cityData => {
    res.json(cityData);
  }).catch(error => {
    console.error(error);
  });
});


exports.add_data = ('/',(req, res, next) => {
  let { name, state } = req.query;
  if(!res.headersSent) {
    // console.log(name,state);
    model.add_city_data(name, state).then(response =>{
      res.send(response)
    }).catch(error =>{
      console.error(error);
    });
  }
});


exports.update_data = ('/', (req, res, next) => {
  let { id, name, state } = req.query
  model.update_city_data(name, state, id).then(response =>{
    res.send(response)
  }).catch(error =>{
    console.error(error);
  });
});

exports.delete_data = ('/', (req, res, next) => {
  let { id } = req.query;
  model.delete_city_data(id).then(response =>{
    res.send(response)
  }).catch(error =>{
    console.error(error);
  });
})


