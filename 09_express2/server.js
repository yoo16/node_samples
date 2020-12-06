//モジュール 読み込み
const express = require('express');
const config = require('config');
const fs = require('fs');

//サンプル Product モデル モジュール読み込み
const Product = require("./src/Product");
const products = Product.values;
let product = {};

//config 設定
const port = config.server.port;
const host = config.server.host;


//サーバ作成
const app = express();

// URLエンコードされたデータを解析する
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ver 3.x
//app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));

// ミドルウェア関数
// 全てのリクエスト
app.use((req, res, next) => {
    console.log(`middleware: all. url: ${req.url}`);

    //CROS設定: 全てのドメインに対して許可 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //次の処理
    next();
});

// /users のミドルウェア
app.use("/users", (req, res, next) => {
    console.log('middleware: users');
    console.log(req.url);
    next();
});

// Webルートリクエスト(POST)
app.post("/", (req, res) => {
    //GET パラメータ取得 (id)
    let id = req.query.id;
    console.log(id);

    //POST データ取得 (message)
    console.log(req.body);

    let message = req.body.message;
    console.log(message);

    //日時生成
    let datetime = new Date();

    let result = {
        'id': id,
        'message': message,
        'datetime': datetime
    };

    //レスポンス
    res.send(result);
});

//リダイレクト
app.get("/user/edit/:id", (req, res) => {
    console.log(req.params.id);
    res.send('edit page');
});

app.get("/user/update/:id", (req, res) => {
    const url = '/user/edit/' + req.params.id;
    res.redirect(url);
});

// /products/id リクエスト(GET)
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

// /products/id/price リクエスト(GET)
app.get("/products/:id/price", (req, res) => {
    let id = req.params.id;
    if (product = products[id]) {
        res.send(String(product.price));
    } else {
        res.send(error);
    }
});

//サーバ待機
app.listen(port, host, () => {
    console.log(`app listen: ${host}:${port}`);
});