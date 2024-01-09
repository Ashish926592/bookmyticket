
import * as model from'./city_model'
export const get_data = ((req, res, next):void => {
  model.get_city_data().then(cityData => {
    res.json(cityData);
  }).catch(error => {
    console.error(error);
  });
});


export const add_data = ((req, res, next):void => {
  let { name, state } = req.query as { name?: string; state?: string };
  if(!res.headersSent) {
    // console.log(name,state);
    if(name !== undefined && state !== undefined) {
      model.add_city_data(name, state).then(response =>{
        res.send(response)
      }).catch(error =>{
        console.error(error);
      });
    }
   
  }
});


export const update_data = ((req, res, next):void => {
  let { id, name, state } = req.query as { id?: number; name?: string; state?: string };
  if(id !== undefined && name !== undefined && state !== undefined){
    model.update_city_data(name, state, id).then(response =>{
      res.send(response)
    }).catch(error =>{
      console.error(error);
    });
  }
 
});

export const delete_data = ( (req, res, next):void => {
  let { id } = req.query as {id?: number};
  if(id !== undefined){
    model.delete_city_data(id).then(response =>{
      res.send(response)
    }).catch(error =>{
      console.error(error);
    });
  }

})


