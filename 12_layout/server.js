const express = require('express')
const config = require('config')
const layouts = require('express-ejs-layouts')

const routes = require('./routes')

const port = config.server.port
const host = config.server.host

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

//テンプレートエンジン EJS
app.set('view engine', 'ejs')

//layout.ejs カスタムパス
app.set('layout', 'layouts/layout')

//layouts ミドルウェア
app.use(layouts)

//routes ミドルウェア
app.use('/', routes)

//ポート:3000待機
app.listen(port, host, () => {
    console.log(`app listen: http://${host}:${port}`)
});