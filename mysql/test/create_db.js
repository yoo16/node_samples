const db = require('../lib/db');
const dotenv = require('dotenv');
dotenv.config();

const info = {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
}
const con = mysql.createConnection(info)

con.connect((err) => {
    if (err) throw err;
})

let sql = 'DROP DATABASE IF EXISTS ' + process.env.DB_NAME + ';';
db.query(con, sql);

sql = 'CREATE DATABASE ' + process.env.DB_NAME + ';';
db.query(con, sql);
