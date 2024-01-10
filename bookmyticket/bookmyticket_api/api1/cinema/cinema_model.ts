import * as db from './db';
import { QueryResult } from 'pg';
export const get_cinema_data = (():Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query('select * from cinema;', (err:Error, dbResponse:QueryResult) => {
            if (!err) {
                resolve(dbResponse.rows)
            } else {
                reject(err.message);
            }

        });
    });


})

// http://localhost:3000/cinema?code=1003&name=PTR+Cinema&city_id=1&address=dsdsd
export const add_cinema_data = ((code:string, name:string, city_id:number, address:string):Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO cinema(code,name,city_id,address) values ($1,$2,$3,$4)`, [code, name, city_id, address], (err:Error, dbResponse:QueryResult) => {
            if (err) {
                console.log(err);
                reject({ "insert": "failed to insert" });
            } else {
                resolve({ "insert": "sucessfully inserted" })
            }

        });
    });

})

// http://localhost:3000/cinema?code=1003&name=PTR+Cinema&city_id=1&address=dsdsd&id=60
export const update_cinema_data = ((code:string, name:string, city_id:number, address:string, id:number):Promise<any> => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE cinema SET code = $1 , name = $2,city_id = $3,address = $4 WHERE id =$5`, [code, name, city_id, address, id], (err:Error, dbResponse:QueryResult) => {
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
    });

})


export const delete_cinema_data = ((id:number) :Promise<any>=> {
    return new Promise((resolve, reject) => {
        db.query(`delete from cinema where id = $1`, [id], (err:Error, dbResponse:QueryResult) => {
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
    });


});






















