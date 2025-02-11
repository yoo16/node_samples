const db = require('../lib/db');
const mysql = require('mysql2/promise');

class Model {
    
    table = "";
    async get() {
        const con = await mysql.createConnection(db.info);
        const sql = `SELECT * FROM ${this.table};`;
        const [rows] = await con.query(sql);
        await con.end();
        return rows;
    }
    async add(post) {
        var sql = `INSERT INTO ${table} SET ?;`;
        const con = await mysql.createConnection(db.info)
        var result;
        try {
            result = await con.query(sql, post);
        } catch (error) {

        } finally {
            await con.end();
        }
        return result;
    }
}

module.exports = Model