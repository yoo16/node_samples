const express = require('express')
const router = express.Router()
const item = require('./item')

router.get('/', (req, res) => {
    let data = {}
    data.title = 'トップページ'
    data.tag = '<p>トップページ</p>'
    data.number = Math.floor(Math.random(100) * 100)
    data.message = 'message コンポーネントに表示します'
    res.render('index.ejs', data)
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

router.get('/item/', (req, res) => {
    const id = req.params.id
    let data = { items: item.values }
    res.render('item/index.ejs', data)
})

router.get('/item/:id', (req, res) => {
    const id = req.params.id
    let data = {}
    if (id && item.values[id]) {
        data.item = item.values[id]
    }
    res.render('item/show.ejs', data)
})

module.exports = router