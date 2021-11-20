const express = require('express');

require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;

const fs = require('fs');

const Product = require("./src/Product");
const products = Product.values;
let product = {};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    console.log('middleware: all. url: ' + req.url);

    //CROS設定: 全てのドメインに対して許可 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use("/users", (req, res, next) => {
    console.log('middleware: users');
    console.log(req.url);
    next();
});

app.post("/", (req, res) => {
    let id = req.query.id;
    console.log(id);
    console.log(req.body);

    let message = req.body.message;
    console.log(message);

    let datetime = new Date();
    let result = {
        'id': id,
        'message': message,
        'datetime': datetime
    };

    res.send(result);
});

app.get("/user/edit/:id", (req, res) => {
    console.log(req.params.id);
    res.send('edit page');
});

app.get("/user/update/:id", (req, res) => {
    const url = '/user/edit/' + req.params.id;
    res.redirect(url);
});

let error = { 'error': 'not found' };
app.get("/products/:id", (req, res) => {
    let id = req.params.id;
    if (product = products[id]) {
        res.setHeader('Content-Type', 'application/json');
        res.send(product);
    } else {
        res.send(error);
    }
});

app.get("/products/:id/price", (req, res) => {
    let id = req.params.id;
    if (product = products[id]) {
        res.send(String(product.price));
    } else {
        res.send(error);
    }
});

app.listen(port, host, () => {
    console.log(`Server listen: http://${host}:${port}`);
});