const express = require('express');
const router = express.Router();

const item = require('./models/item');

router.get('/', (req, res) => {
    // res.send('Hello Express Router!!');
    res.render('index');
})

router.get("/profile", (req, res) => {
    res.send("This is Profile page.");
})

router.post('/auth', (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;

    var message = 'ログインできませんでした';
    if (login_name == process.env.LOGIN_NAME && password == process.env.PASSWORD) {
        message = 'ログインしました';
    }
    res.send(message);
})

router.get("/item/", (req, res) => {
    // const items = item.get();
    // var message = "";
    // for (const item of items) {
    //    message += item.name 
    // }
    // res.send(message);
    var data = {
        items: item.get()
    }
    res.render('item/index', data)
})

router.get('/item/:id', (req, res) => {
    // var message = '商品がみつかりませんでした';
    // const id = req.params.id;
    // const selectItem = item.find(id);
    // if (selectItem) {
    //     message = selectItem.name;
    // }
    // res.send(message);

    const id = req.params.id;
    var data = {
        item: item.find(id)
    }
    res.render('item/show', data)
})

module.exports = router