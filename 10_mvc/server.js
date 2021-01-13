//モジュール読み込み
const express = require('express')
//const ejs = require('ejs')
const config = require('config')

//カスタムモジュール routes.js 読み込み
const routes = require('./routes')

//config 設定
const port = config.server.port
const host = config.server.host

//Express 作成
const app = express()

//EJS 設定
app.set('view engine', 'ejs')

//JSON
app.use(express.json())

//URLエンコード
app.use(express.urlencoded({ extended: true }))

//静的ファイル有効
app.use(express.static(__dirname + '/public'))

//ミドルウェアルーティング
app.use(routes)

//ポート:3000待機
app.listen(port, host, () => {
    console.log(`app listen: http://${host}:${port}`)
});