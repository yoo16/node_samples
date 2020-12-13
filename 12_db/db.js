const mysql = require('mysql');
const config = require('config');
const connection = mysql.createConnection(config.mysql)

exports.connect = () => {
    connection.connect((error) => {
        if (error) {
            console.log("SQL Connection Error: " + error);
        } else {
            console.log("SQL Connection Success.");
        }
    })
    return connection
}