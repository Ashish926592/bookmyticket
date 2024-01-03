let model = require('./city_model')

exports.get_data = ('/', (req, res, next) => {
  model.get_city_data(res);
});


exports.add_data = ('/',(req, res, next) => {
  let { name, state } = req.query;
  if(!res.headersSent) {
    // console.log(name,state);
    model.add_city_data(name, state, res);
  }
});


exports.update_data = ('/', (req, res, next) => {
  let { id, name, state } = req.query
  model.update_city_data(name, state, id, res);
});

exports.delete_data = ('/', (req, res, next) => {
  let { id } = req.query;
  model.delete_city_data(id, res);
})


