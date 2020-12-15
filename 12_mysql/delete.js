// DB の connect 処理をモジュールにして読み込む
const db_connect = require('./lib/db');

//db_connect: connect()
const con = db_connect.connect();

const email = 'tanaka@example.com';
let sql = 'DELETE FROM users WHERE email = ?;';
con.query(sql, email, (err, results) => {
    if (err) console.log(err.sqlMessage);
    console.log(sql);
    console.log(results);
})

//DB接続終了
con.end();