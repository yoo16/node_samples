//モジュール読み込み
const mysql = require('mysql');
const config = require('config');

//MySQL 接続(データベース指定なし)
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '',
});
con.connect((err) => {
    if (err) throw err;
    console.log('connect success!');
})

//DB作成SQL
const sql = 'CREATE DATABASE ' + config.mysql.database;
console.log(sql);

//SQL実行
con.query(sql, (err) => {
    if (err) throw err;
    console.log('created database!');
});

//DB接続終了
con.end();