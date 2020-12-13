const mysql = require('mysql');
const config = require('config');

//default.json から設定を読み込み、MySQL に設定
const connection = mysql.createConnection(config.mysql)

let posts = { 
    name: 'Test User' ,
    email: 'test@test.com',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
}

sql = 'INSERT INTO users SET ?;';
connection.query(sql, posts, (error, results, fields) => {
    console.log(`SQL: ${sql}`);
    if (error) {
        console.log('SQL: Error!');
    } else {
        console.log('SQL: Success');
    }
})

connection.end();