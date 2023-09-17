const db = require('../lib/db');
const mysql = require('mysql2/promise');

exports.find = async (id) => {
    const sql = 'SELECT * FROM items WHERE ?;';
    const con = await mysql.createConnection(db.info)
    const [rows] = await con.query(sql, { id: id });
    await con.end();
    return rows[0];
}
exports.get = async () => {
    const con = await mysql.createConnection(db.info);
    const sql = 'SELECT * FROM items;';
    const [rows] = await con.query(sql);
    await con.end();
    return rows;
}