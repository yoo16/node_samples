const db = require('../lib/db');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt')

const password = bcrypt.hashSync('password', 10);
let posts = [
    { name: 'Adam', email: 'adam@test.com', password: password, },
    { name: 'Bob', email: 'bob@test.com', password: password, },
    { name: 'Chris', email: 'chris@test.com', password: password, },
    { name: 'David', email: 'david@test.com', password: password, },
    { name: 'Eliza', email: 'eliza@test.com', password: password, },
]
let sql = 'INSERT INTO users SET ?;';

const inserts = async () => {
    const con = await mysql.createConnection(db.info)
    await posts.forEach((post) => {
        con.query(sql, post);
    })
    await con.end();
}
inserts();