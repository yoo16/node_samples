//モジュール読み込み
const express = require('express')
const product = require('./src/Product')

//Express 作成
const app = express()

//ミドルウェアの利用
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//ルーティング
app.get('/', (req, res) => {
    res.send('Hello Express');
});

// Webルートの POST リクエストに対応
app.post('/', (req, res) => {
    let result = {
        id: req.query.id,
        message: req.body.message,
        datetime: new Date(),
    }
    res.send(result);
});

app.get('/products/:id', (req, res) => {
    const product_id = req.params.id;
    console.log(product_id);

    let product_value = {};
    if (product_value = product.values[product_id]) {
        res.setHeader('Content-Type', 'application/json');
        res.send(product_value);
    } else {
        res.send('Not found product!');
    }
})

app.get('/profile', (req, res) => {
    res.send('My Name is XXXXX');
});
//サーバ待機
app.listen(3000)
// コンソール: node server で起動
// http://localhost:3000 にアクセス