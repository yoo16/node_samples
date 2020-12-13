
exports.fetch = (req, res) => {
    const connection = mysql.createConnection(config.mysql)
    connection.connect();

    let sql = 'SELECT * FROM items';
    connection.query(sql,
        function (error, results, fields) {
            if (error) throw error;
            res.render('list', { products: results });
        });
    connection.end();
}