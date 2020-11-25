"use strict";

const express = require('express');
const config = require('config');

const port = config.server.port;
const host = config.server.host;

const app = express();

//サンプルモデル
let product = {};
const products = {
    1: { name: 'Apple', price: 150 },
    2: { name: 'Orange', price: 100 },
    3: { name: 'Peach', price: 200 },
}

// URLエンコードされたデータを解析する
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ver3.x
//app.use(bodyParser.urlencoded());

// ミドルウェア関数
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(product));
        //res.send(product);
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
    res.send('GET Request: users')
});

app.post("/", (req, res) => {
    let id = req.query.id;
    let message = req.body.message;
    let datetime = new Date();
    console.log(id);
    console.log(message);
    console.log(req.body);
    let result = { 
        'id' : id, 
        'message' : message,
        'datetime': datetime
    };
    res.send(result);
});

//サーバ待機
app.listen(port, host, () => {
    console.log(`app listen: ${host}:${port}`);
});
