const db = require('../lib/db');

const con = db.connect();

let params = { id: 1 };
let sql = 'DELETE FROM users WHERE ?;';



con.query(sql, params, (err, results) => {
    if (err) throw err;
    console.log('delete success.');
})

//DB接続終了
con.end();