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

module.exports = router