const express = require('express');
const router = express.Router();
// item.js ファイルの読み込み
const item = require('./models/item');

router.get('/', (req, res) => {
    res.send('Hello Express Router!!');
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

router.get("/item/", (req, res) => {
    const items = item.get();
    res.send(message);
})

router.get('/item/:id', (req, res) => {
    let message = '商品がみつかりませんでした';
    const id = req.params.id;
    const _item = item.find(id);
    if (_item) {
        message = _item.name + 'の価格:' + _item.price + '円';
    }
    res.send(message);
})

module.exports = router