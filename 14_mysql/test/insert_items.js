const db = require('../lib/db');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt')

let posts = [
    { name: 'コーヒー', price: 120, stock: 0, },
    { name: '紅茶', price: 150, stock: 0, },
    { name: 'ほうじ茶', price: 100, stock: 0, },
]
let sql = 'INSERT INTO items SET ?;';

const inserts = async () => {
    const con = await mysql.createConnection(db.info)
    await posts.forEach((post) => {
        con.query(sql, post);
    })
    await con.end();
}
inserts();