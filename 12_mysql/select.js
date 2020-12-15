// DB の connect 処理をモジュールにして読み込む
const db_connect = require('./lib/db');

//db_connect: connect()
const con = db_connect.connect();

//users から 10件取得
const limit = 3;
const offset = 0;
let params = [limit, offset];
let sql = 'SELECT * FROM users LIMIT ? OFFSET ?;';
con.query(sql, params, (error, results, fields) => {
    results.forEach((user, index) => {
        console.log(`${user.id} : ${user.email}`);
    })
})

//users から id で検索
params = { 'id': 5 };
sql = 'SELECT * FROM users WHERE ?;';
con.query(sql, params, (error, results, fields) => {
    if (results[0]) {
        const user = results[0];
        console.log(`${user.id} : ${user.name} : ${user.email}`);
    } else {
        console.log('Not found user.');
    }
})

//DB接続終了
con.end();