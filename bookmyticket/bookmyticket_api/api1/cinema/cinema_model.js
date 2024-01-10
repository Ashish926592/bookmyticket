"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_cinema_data = exports.update_cinema_data = exports.add_cinema_data = exports.get_cinema_data = void 0;
var db = require("./db");
exports.get_cinema_data = (function () {
    return new Promise(function (resolve, reject) {
        db.query('select * from cinema;', function (err, dbResponse) {
            if (!err) {
                resolve(dbResponse.rows);
            }
            else {
                reject(err.message);
            }
        });
    });
});
exports.add_cinema_data = (function (code, name, city_id, address) {
    return new Promise(function (resolve, reject) {
        db.query("INSERT INTO cinema(code,name,city_id,address) values ($1,$2,$3,$4)", [code, name, city_id, address], function (err, dbResponse) {
            if (err) {
                console.log(err);
                reject({ "insert": "failed to insert" });
            }
            else {
                resolve({ "insert": "sucessfully inserted" });
            }
        });
    });
});
exports.update_cinema_data = (function (code, name, city_id, address, id) {
    return new Promise(function (resolve, reject) {
        db.query("UPDATE cinema SET code = $1 , name = $2,city_id = $3,address = $4 WHERE id =$5", [code, name, city_id, address, id], function (err, dbResponse) {
            if (err) {
                console.log(err);
                reject({ "update": "failed to update" });
            }
            else {
                // Check if any rows were affected
                if (dbResponse.rowCount === 0) {
                    reject({ "update": "No matching record found for the provided ID" });
                }
                else {
                    resolve({ "update": "Data updated for ID ".concat(id) });
                }
            }
        });
    });
});
exports.delete_cinema_data = (function (id) {
    return new Promise(function (resolve, reject) {
        db.query("delete from cinema where id = $1", [id], function (err, dbResponse) {
            if (err) {
                console.log(err);
                reject({ "delete": "failed to delete" });
            }
            else {
                if (dbResponse.rowCount === 0) {
                    reject({ "delete": "No matching record found for the provided ID" });
                }
                else {
                    resolve({ "delete": "sucessfully deleted" });
                }
            }
        });
    });
});
