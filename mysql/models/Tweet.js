const db = require('../lib/db');
const Model = require('./Model');
const mysql = require('mysql2/promise');

class Tweet extends Model {
    table = "tweets"

    find = async (id) => {
        const sql = 'SELECT * FROM tweets WHERE ?;';
        const con = await mysql.createConnection(db.info)
        const [rows] = await con.query(sql, { id: id });
        await con.end();
        return rows[0];
    }
    get = async () => {
        const con = await mysql.createConnection(db.info);
        const sql = 'SELECT * FROM tweets;';
        const [rows] = await con.query(sql);
        await con.end();
        return rows;
    }

}

module.exports = Tweet