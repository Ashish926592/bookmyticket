import * as db from './db';
import { QueryResult } from 'pg';

interface City {
    id: number;
    name: string;
    state: string;
  }
export const get_city_data = (():Promise<City[]> => {

    return new Promise((resolve, reject) => {
        db.query('Select * from city;', (err:Error, dbResponse:QueryResult<City>) => {
            if (!err) {
                resolve(dbResponse.rows);
                //  console.log(dbResponse.rows)
            } else {
                console.log(err.message);
                reject(err);
            }
        });
    })
})
// http://localhost:3000/city?name=aa&state=bbb
export const add_city_data = ((name:string, state:string):Promise<{ insert: string } >=> {
    return new Promise((resolve, reject) => {

        db.query(`INSERT INTO city(name,state) values ($1,$2)`, [name, state], (err) => {
            if (err) {
                console.log(err);
                reject({ "insert": "failed to insert" });
            } else {
                resolve({ "insert": "sucessfully inserted" })
            }
        });
    });
})


export const update_city_data = ((name:string, state:string, id:number):Promise<{ update: string } >=> {
    return new Promise((resolve, reject) => {
        let queryExists = `SELECT * FROM city WHERE id = $1`;

        db.query(queryExists, [id], (error, result) => {
            if (!result.rows.length) {
                reject(`City id ${id} doesn't exist`);
            } else {
                db.query(`UPDATE city SET name = $1 , state = $2 WHERE id =$3`, [name, state, id], (err, dbResponse) => {
                    if (err) {
                        console.log(err);
                        reject({ "update": "failed to update" });
                    } else {
                        // Check if any rows were affected
                        if (dbResponse.rowCount === 0) {
                            reject({ "update": "No matching record found for the provided ID" });
                        } else {
                            resolve({ "update": `Data updated for ID ${id}` });
                        }
                    }
                });

            }
        });


    });


})


export const delete_city_data = ((id:number) :Promise<{ delete: string } >=> {
    return new Promise((resolve, reject) => {
        let queryExists = `SELECT * FROM city WHERE id = $1`;

        db.query(queryExists, [id], (error, result) => {
            if (!result.rows.length) {
                reject(`City id ${id} doesn't exist`);
            } else {
                db.query(`delete from city where id = $1`, [id], (err, dbResponse) => {
                    if (err) {
                        console.log(err);
                        reject({ "delete": "failed to delete" });
                    } else {
                        if (dbResponse.rowCount === 0) {
                            reject({ "delete": "No matching record found for the provided ID" });
                        } else {
                            resolve({ "delete": "sucessfully deleted" });
                        }
                    }
                });

            }
        });
    });

});
