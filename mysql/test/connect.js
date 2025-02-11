const mysql = require('mysql2');
const db = require('../lib/db');

const con = mysql.createConnection(db.info);
con.connect((err) => {
    if (err) throw err;
    console.log('DB connect!!')
})
con.end();