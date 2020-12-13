const db = require('../db');
const connection = db.connect();
const tableName = 'items';

exports.fetchAll = (callback) => {
    const sql = 'SELECT * FROM ' + tableName;
    connection.query(sql, (error, results, fields) => {
        callback(error, results, fields)
    })
}

exports.insert = (posts, callback) => {
    const sql = 'INSERT INTO items SET ?;';
    connection.query(sql, posts, (error, results, fields) => {
        callback(error, results, fields)
    })
}