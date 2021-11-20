const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    let data = {}
    data.title = 'トップページ'
    data.tag = '<p>トップページ</p>'
    data.items = [
        { name: 'Apple' },
        { name: 'Orange' },
        { name: 'Peach' },
        { name: 'Strawberry' },
        { name: 'Grape' },
    ]
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
    res.send('user edit page: id =' + id);
});

router.get('/item/:id', (req, res) => {
    const items = {
        1: { name: 'コーヒー', price: 150 },
        2: { name: '紅茶', price: 180 },
        3: { name: 'ほうじ茶', price: 100 },
    }
    const id = req.params.id
    let item = 'Not Found item.'
    if (id && items[id]) item = items[id]

    res.send(item)
})

module.exports = router