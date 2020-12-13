const config = require('config')
const mysql = require('mysql');
//const item = require('../models/Item');

exports.index = (req, res) => {
    const sql = 'SELECT * FROM items';
    const connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql, (error, rows, fields) => {
        let data = { items: rows, error: error };
        res.render('item/index', data);
    });
    connection.end();
}

exports.create = (req, res) => {
    res.render('item/create');
}

exports.add = (req, res) => {
    const posts = req.body;
    const sql = 'INSERT INTO items SET ?;';
    //const sql = 'INSERT INTO items (code, name, price) VALUES (?, ?, ?);';
    const connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql, posts, (error, rows, fields) => {
        if (error) {
            res.redirect('/item/create');
        } else {
            res.redirect('/item');
        }
    });
    connection.end();
}

exports.edit = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM items WHERE id = ' + id;
    const connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql, (error, rows, fields) => {
        if (error) {
            res.redirect('/item');
        } else {
            let data = { item: rows[0], error: error };
            res.render('item/edit', data);
        }
    });
    connection.end();
}

exports.update = (req, res) => {
    const id = req.params.id;
    const posts = req.body;
    const sql = 'UPDATE items SET ? WHERE id = ?;';
    const connection = mysql.createConnection(config.mysql);
    connection.connect();
    connection.query(sql, [posts, id], (error, rows, fields) => {
        if (error) {
            res.redirect('/item/edit/' + id);
        } else {
            res.redirect('/item');
        }
    });
    connection.end();
}