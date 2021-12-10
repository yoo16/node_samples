const db = require('../lib/db');
const mysql = require('mysql2/promise');

exports.find = async (id) => {
    const sql = 'SELECT * FROM items WHERE ?;';
    params = { id: id };

    const con = await mysql.createConnection(db.info)
    const [rows] = await con.query(sql, params);
    await con.end();
    return rows[0];
}
exports.get = async () => {
    const sql = 'SELECT * FROM items;';
    const con = await mysql.createConnection(db.info)
    params = { limit: 10, offset: 0 };
    const [rows] = await con.query(sql);
    await con.end();
    return rows;
}