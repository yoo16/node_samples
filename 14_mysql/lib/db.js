const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();
const db_name = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

exports.info = {
    database: db_name,
    host: host,
    user: user,
    port: port,
    password: password,
}

exports.connect = () => {
    const con = mysql.createConnection(this.info)
    con.connect((err) => {
        if (err) throw err;
    })
    return con;
}

exports.query = async (con, sql, params) => {
    return con.query(sql, params, (err) => {
        if (err) throw err;
        console.log(sql);
        con.end();
    });
}

// exports.insert = (table_name, posts) => {
//     let sql = `INSERT INTO ${table_name} SET ?;`;
//     posts.forEach((post) => {
//         con.query(sql, post, (err, results) => {
//             if (err) console.log(err.sqlMessage);
//             console.log('insert success.');
//         })
//     })
// }