const express = require('express')
// routes.js ファイルの読み込み
const routes = require('./routes')

const dotenv = require('dotenv');
dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Router をミドルウェアで処理
app.use(routes)

app.listen(port, host, () => {
    console.log(`Server listen: http://${host}:${port}`)
})