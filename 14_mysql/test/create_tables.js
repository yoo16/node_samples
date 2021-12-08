const db = require('../lib/db');
const fs = require('fs');

let files = [
    './sql/01_create_table_users.sql',
];

//外部SQL ファイルの実行
files.forEach((file) => {
    if (fs.existsSync(file)) {
        const sql = fs.readFileSync(file, 'utf-8');
        console.log(sql);
        const con = db.connect();
        con.query(sql, (err) => {
            if (err) throw err;
        });
        con.end();
    } else {
        console.log(`Not found ${file}`);
    }
})