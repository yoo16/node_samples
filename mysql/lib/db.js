const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db_info = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD, 
}

exports.connect = () => {
    const con = mysql.createConnection(db_info)
    con.connect();
    con.end();
}

exports.inserts = (table, posts) => {
    let sql = `INSERT INTO ${table} SET ?;`;
    const con = mysql.createConnection(db_info)
    posts.forEach((post) => {
        con.query(sql, post);
    })
    con.end();
}

exports.deletes = (table) => {
    let sql = `DELETE FROM ${table};`;
    const con = mysql.createConnection(db_info)
    con.query(sql);
    con.end();
}