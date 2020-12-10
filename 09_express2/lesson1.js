//モジュール読み込み
const express = require('express')
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
        message: 'Hello'
    }
    res.send(result);
});

app.get('/profile', (req, res) => {
    res.send('My Name is XXXXX');
});
//サーバ待機
app.listen(3000)
// コンソール: node server で起動
// http://localhost:3000 にアクセス