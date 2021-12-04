const express = require('express');
const router = express.Router();
const item = require('./models/item');

router.get('/', (req, res) => {
    let data = {}
    data.title = 'トップページ';
    res.render('index.ejs', data);
})

router.get("/profile", (req, res) => {
    let user = {
        id: 1,
        name: '横浜　太郎',
        birthplace: '横浜',
        hobby: ['旅行', 'グルメ', 'スポーツ'],
    }
    let data = {};
    data.title = 'プロフィール';
    data.user = user;

    res.render('profile/index.ejs', data);
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
    const id = req.params.id;
    const message = 'ユーザID: ' + id;
    res.send(message);
})

router.get('/item/', (req, res) => {
    let data = { items: item.values };
    data.title = '商品一覧';
    res.render('item/index.ejs', data);
})

router.get('/item/:id', (req, res) => {
    const id = req.params.id;
    let data = {};
    data.item = item.find(id);
    data.title = '商品情報';
    res.render('item/show.ejs', data);
})

module.exports = router