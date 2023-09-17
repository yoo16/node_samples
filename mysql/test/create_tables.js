const db = require('../lib/db');
const mysql = require('mysql2');
const fs = require('fs');

let files = [
    './sql/01_create_table_users.sql',
    './sql/02_create_table_items.sql',
];

const imports = (files) => {
    const con = mysql.createConnection(db.info)
    files.forEach((file) => {
        if (fs.existsSync(file)) {
            const sql = fs.readFileSync(file, 'utf-8');
            const con = mysql.createConnection(db.info)
            con.query(sql);
            con.end();
        } else {
            console.log(`Not found ${file}`);
        }
    })   
    con.end();
}
imports(files);