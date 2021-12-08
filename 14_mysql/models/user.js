const db = require('../lib/db');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

exports.find = (id) => {
    const con = db.connect()
    const sql = 'SELECT * FROM users WHERE ?;';
    params = { id: id };
    const [rows, fields] = con.query(sql, params);
    for (const val of rows) {
        console.log(val.id, val.name);
    }
}

exports.auth = async (email, password) => {
    const sql = 'SELECT * FROM users WHERE ?;';
    params = { email: email };
    const con = await mysql.createConnection(db.info)
    const [rows, fields] = await con.query(sql, params);

    let user = rows[0];
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            console.log(user)
            return user;
        }
    }
    return;
}