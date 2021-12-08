const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const host = process.env.DB_HOST
const user = process.env.DB_USER
const port = process.env.DB_PORT
const password = process.env.DB_PASSWORD


const con = mysql.createConnection({
    host: host,
    user: user,
    port: port,
    password: password,
});
con.connect((err) => {
    if (err) throw err;
    console.log('connect success!');
})
con.end();