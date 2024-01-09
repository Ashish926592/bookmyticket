"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_city_data = exports.update_city_data = exports.add_city_data = exports.get_city_data = void 0;
var db = require("./db");
exports.get_city_data = (function () {
    return new Promise(function (resolve, reject) {
        db.query('Select * from city;', function (err, dbResponse) {
            if (!err) {
                resolve(dbResponse.rows);
                //  console.log(dbResponse.rows)
            }
            else {
                console.log(err.message);
                reject(err);
            }
        });
    });
});
exports.add_city_data = (function (name, state) {
    return new Promise(function (resolve, reject) {
        db.query("INSERT INTO city(name,state) values ($1,$2)", [name, state], function (err, dbResponse) {
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
exports.update_city_data = (function (name, state, id) {
    return new Promise(function (resolve, reject) {
        var queryExists = "SELECT * FROM city WHERE id = $1";
        db.query(queryExists, [id], function (error, result) {
            if (!result.rows.length) {
                reject("City id ".concat(id, " doesn't exist"));
            }
            else {
                db.query("UPDATE city SET name = $1 , state = $2 WHERE id =$3", [name, state, id], function (err, dbResponse) {
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
            }
        });
    });
});
exports.delete_city_data = (function (id) {
    return new Promise(function (resolve, reject) {
        var queryExists = "SELECT * FROM city WHERE id = $1";
        db.query(queryExists, [id], function (error, result) {
            if (!result.rows.length) {
                reject("City id ".concat(id, " doesn't exist"));
            }
            else {
                db.query("delete from city where id = $1", [id], function (err, dbResponse) {
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
            }
        });
    });
});
