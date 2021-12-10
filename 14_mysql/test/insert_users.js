const db = require('../lib/db');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt')

const password = bcrypt.hashSync('password', 10);
let posts = [
    { name: 'Adam', email: 'adam@test.com', password: password, 'hobby': '旅行,グルメ' },
    { name: 'Bob', email: 'bob@test.com', password: password, 'hobby': 'スポーツ,音楽' },
    { name: 'Chris', email: 'chris@test.com', password: password, 'hobby': '映画,読書' },
    { name: 'David', email: 'david@test.com', password: password, 'hobby': 'スポーツ,ゲーム' },
    { name: 'Eliza', email: 'eliza@test.com', password: password, 'hobby': 'ゲーム,グルメ' },
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