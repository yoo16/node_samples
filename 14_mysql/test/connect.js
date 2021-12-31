const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db_info = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD, 
}

const con = mysql.createConnection(db_info);
con.connect((err) => {
    if (err) throw err;
    console.log('DB connect!!')
})
con.end();