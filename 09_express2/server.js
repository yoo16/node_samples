"use strict";

const express = require('express');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const app = express();

//サンプルモデル
let product = {};
const products = [
    { id: 1, name: 'Apple', price: 150 },
    { id: 2, name: 'Orange', price: 100 },
    { id: 3, name: 'Peach', price: 200 },
]

// URLエンコードされたデータを解析する
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ver3.x
//app.use(bodyParser.urlencoded());

// ミドルウェア関数設定
app.use((req, res, next) => {
    console.log('middleware:root');
    console.log(req.url);
    next();
});

app.use("/users", (req, res, next) => {
    console.log('middleware:users');
    console.log(req.url);
    next();
});

// リクエスト
app.get("/products/:id", (req, res) => {
    let id = req.params.id;
    if (product = products[id]) {
        res.send(`product:[${product.id}] ${product.name}`);
    } else {
        res.send('Not found products.');
    }
});

app.get("/products/:id/price", (req, res) => {
    let id = req.params.id;
    if (product = products[id]) {
        res.send(String(product.price));
    } else {
        res.send('Not found products.');
    }
});

app.get("/users", (req, res) => {
    console.log('users');
});

app.post("/", (req, res) => {
    let id = req.query.id;
    let message = req.body.message;
    console.log(id);
    console.log(message);
    res.send(`POST: id = ${id}, message = ${message}`);
});

//サーバ待機
app.listen(port, host, () => {
    console.log(`app listen: ${host}:${port}`);
});
