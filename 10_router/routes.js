const express = require('express')
const router = express.Router()
// item.js ファイルの読み込み
const item = require('./item')

router.get('/', (req, res) => {
    res.send('Hello Express Router!!')
})

router.get("/profile", (req, res) => {
    res.send("This is Profile page.");
})

router.post('/auth', (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;

    let message = 'ログインできませんでした';
    if (login_name == process.env.LOGIN_NAME && password == process.env.PASSWORD) {
        message = 'ログインしました';
    }
    res.send(message);
})

router.get("/user/edit/:id", (req, res) => {
    const id = req.params.id
    const message = 'ユーザID: ' + id
    res.send(message);
})

router.get('/item/:id', (req, res) => {
    const id = req.params.id
    let message = '商品がみつかりませんでした'
    let _item
    if (id && (_item = item.values[id])) {
        message = _item.name + 'の価格:' + _item.price + '円'
    }
    res.send(message)
})

module.exports = router