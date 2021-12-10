const db = require('../lib/db');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

exports.auth = async (email, password) => {
    const sql = 'SELECT * FROM users WHERE ?;';
    params = { email: email };
    const con = await mysql.createConnection(db.info)
    const [rows, fields] = await con.query(sql, params);
    con.end();

    let user = rows[0];
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            return user;
        }
    }
    return;
}