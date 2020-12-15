const mysql = require('mysql');
const config = require('config');

//MySQL 接続
const con = mysql.createConnection(config.mysql);
con.connect((err) => {
    if (err) throw err;
    console.log('database droped!');
})

//DB作成SQL
const sql = 'DROP DATABASE ' + config.mysql.database;

//SQL実行
con.query(sql);

//DB接続終了
con.end();