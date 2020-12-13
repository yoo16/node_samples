const mysql = require('mysql');
const config = require('config');

//default.json から設定を読み込み、MySQL に設定
let email = 'test@test.com';
deleteUserByEmail(email);

function deleteUserByEmail(email) {
    const connection = mysql.createConnection(config.mysql)
    let params = { email: email }
    let sql = 'SELECT * FROM users WHERE ?;';
    connection.query(sql, params, (error, results, fields) => {
        if (user = results[0]) deleteUser(user);
    })
    connection.end();
}

function deleteUser(user) {
    if (!user.id) return;

    const connection = mysql.createConnection(config.mysql)
    let params = { id: user.id };
    console.log(params);
    let sql = 'DELETE FROM users WHERE ?;';
    connection.query(sql, params, (error, results, fields) => {
        if (error) throw error;
        console.log(results);
    })
    connection.end();
}