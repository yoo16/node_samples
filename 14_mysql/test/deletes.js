const db = require('../lib/db');
const mysql = require('mysql2/promise');

const deletes = async () => {
    let sql = 'DELETE FROM users;';
    const con = await mysql.createConnection(db.info)
    await con.query(sql);
    await con.end();
}
deletes();