import * as model from './cinema_model'

export const get_data = ((req, res, next):void => {
  model.get_cinema_data().then(response =>{
    res.json(response);
  }).catch(error =>{
    console.error(error);
  });
});


export const add_data = ((req, res, next):void => {
  let { code,name,city_id,address } = req.query as {code?: string;name?: string;city_id?:number;address?:string}
  if(code !== undefined && name !== undefined && city_id !== undefined && address !== undefined){
    model.add_cinema_data(code,name,city_id,address).then(response =>{
      res.send(response)
    }).catch(error =>{
      console.error(error);
    });
  }else {
    res.status(400).send('Bad Request: Missing required parameters');
  }
 
});


export const update_data = ((req, res, next) => {
  let { code,name,city_id,address, id } = req.query as {code?: string, name?: string, city_id?: number, address?: string,id?: number}
  if(code !== undefined && name !== undefined && city_id !== undefined && address !== undefined && id !== undefined){
    model.update_cinema_data(code,name,city_id,address, id).then(response =>{
      res.send(response)
    }).catch(error =>{
      console.error(error);
    });
  }else {
    res.status(400).send('Bad Request: Missing required parameters');
  }

});

export const delete_data = ((req, res, next) => {
  let { id } = req.query as { id?: number };
  if( id!== undefined){
    model.delete_cinema_data(id).then(response =>{
      res.send(response)
    }).catch(error =>{
      console.error(error);
    });
  }else {
    res.status(400).send('Bad Request: Missing required parameters');
  }
 
})


