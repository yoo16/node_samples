// const db = require('../db');
const mysql = require('mysql');
const config = require('config');
const tableName = 'items';
let limit = 10;
let offset = 0;

exports.fetch = (callback) => {
    let params = [limit, offset];
    const sql = 'SELECT * FROM ' + tableName + ' LIMIT ? OFFSET ?';

    //TODO
    const con = mysql.createConnection(config.mysql)
    con.connect()
    con.query(sql, params, (err, results, fields) => {
        callback(err, results, fields)
    })
    con.end();
}

exports.find = (id, callback) => {
    const sql = 'SELECT * FROM items WHERE ?';
    let params = { id : id };

    const con = mysql.createConnection(config.mysql)
    con.connect();
    con.query(sql, params, (err, results, fields) => {
        callback(err, results, fields)
    })
}

exports.insert = (params, callback) => {
    const sql = 'INSERT INTO items SET ?;';

    const con = mysql.createConnection(config.mysql)
    con.connect();
    con.query(sql, params, (err, results) => {
        console.log(err);
        callback(err, results)
    });
    con.end();
}