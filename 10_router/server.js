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

router.get('/calculate/tax', (req, res) => {
    const tax_rate = 0.1
    const price = req.query.price
    const tax = price * tax_rate
    res.send(String(tax))
})

router.get('/city/:id', (req, res) => {
    const cities = {
        1: 'Tokyo', 2: 'Yokohama', 3: 'Osaka', 4: 'Nagoay', 5: 'Fukuoka',
    }
    const id = req.params.id
    let city = 'Not Found.'
    if (id && cities[id]) city = cities[id]

    res.send(city)
})

//サーバ待機
app.listen(3000)

console.log('Listen: http://localhost:3000')