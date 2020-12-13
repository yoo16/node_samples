const mysql = require('mysql');
const config = require('config');

exports.connect = () => {
    const connection = mysql.createConnection(config.mysql);
    return connection.connect();
}

exports.query = (sql) => {
    const connection = this.connect();
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        return results;
    });
    connection.end();
}
