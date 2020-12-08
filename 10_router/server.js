//モジュール読み込み
const express = require('express')

//Router 作成
const router = express.Router()

//サーバ作成
const app = express()

//ミドルウェア router
app.use('/', router);

//ルーティング
router.get('/', (req, res) => {
    res.send('Hello Express Router!!')
});

router.get('/message/list', (req, res) => {
    res.send('Message list page')
});

//サーバ待機
app.listen(3000)

console.log('Listen: http://localhost:3000')