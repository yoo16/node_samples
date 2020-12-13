const config = require('config')
const mysql = require('mysql');
const { post } = require('../routes');

exports.index = (req, res) => {
    const connection = mysql.createConnection(config.mysql);
    connection.connect();

    let sql = 'SELECT * FROM items';
    connection.query(sql,
        function (error, results, fields) {
            let data = { 
                items: results,
                error: error
            };
            res.render('item/index', data);
        });
    connection.end();
}

exports.create = (req, res) => {
    res.render('item/create');
}

exports.add = (req, res) => {
    let posts = {}
    posts.code = req.body.code;
    posts.name = req.body.name;
    posts.price = req.body.price;
    console.log(posts);

    let sql = 'INSERT INTO items SET ?;';
    //let sql = 'INSERT INTO items (code, name, price) VALUES (?, ?, ?);';

    const connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql, posts, (error, results, fields) => {
            if (error) {
                res.redirect('/item/create');
            } else {
                res.redirect('/item');
            }
        });
    connection.end();
}

exports.edit = (req, res) => {
    res.render('item/edit');
}

exports.update = (req, res) => {
    res.redirect('item/edit');
}