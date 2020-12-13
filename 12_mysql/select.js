const mysql = require('mysql');
const config = require('config');

//default.json から設定を読み込み、MySQL に設定
const connection = mysql.createConnection(config.mysql)

//MySQL 接続
connection.connect((error) => {
    if (error) {
        console.log("SQL Connection Error: " + error);
    } else {
        console.log("SQL Connection Success.");
    }
})

let sql = 'SELECT * FROM users LIMIT 10;';
connection.query(sql, (error, results, fields) => {
    console.log(`SQL: ${sql}`);
    const users = results;
    users.forEach((user, index) => {
        console.log(`${user.id} : ${user.name}`);
    })
})

let params = {};
params = { id: 5 };
sql = 'SELECT * FROM users WHERE ?;';
connection.query(sql, params, (error, results, fields) => {
    console.log(`SQL: ${sql}`);
    const user = results[0];
    console.log(`${user.id} : ${user.name} : ${user.email}`);
})

connection.end();