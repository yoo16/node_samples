const db = require('../lib/db');
const dotenv = require('dotenv');
dotenv.config();

const info = {
    database: db_name,
    host: host,
    user: user,
    port: port,
    password: password,
}
const con = mysql.createConnection(info)

con.connect((err) => {
    if (err) throw err;
})

let sql = 'DROP DATABASE IF EXISTS ' + process.env.DB_NAME + ';';
db.query(con, sql);

sql = 'CREATE DATABASE ' + process.env.DB_NAME + ';';
db.query(con, sql);
