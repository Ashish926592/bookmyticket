let model = require('./cinema_model')

exports.get_data = ('/', (req, res, next) => {
  model.get_cinema_data(res);
});


exports.add_data = ('/', (req, res, next) => {
  let { code,name,city_id,address } = req.query
  model.add_cinema_data(code,name,city_id,address, res);
});


exports.update_data = ('/', (req, res, next) => {
  let { code,name,city_id,address, id } = req.query
  model.update_cinema_data(code,name,city_id,address, id, res);
});

exports.delete_data = ('/', (req, res, next) => {
  let { id } = req.query;
  model.delete_cinema_data(id, res);
})


