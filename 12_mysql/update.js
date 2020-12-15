// DB の connect 処理をモジュールにして読み込む
const db = require('./lib/db');

//db: connect()
const con = db.connect();

//users から id で検索
params = [ { 'email': 'tanaka@test.com' } , { 'email': 'tanaka@example.com' }];
sql = 'UPDATE users SET ? WHERE ?;';
con.query(sql, params, (err, results) => {
    if (err) throw err;
    console.log('update success.');
})

//DB接続終了
con.end();