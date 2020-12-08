//モジュール読み込み
const express = require('express')
const router = require('./router')
const ejs = require('ejs')
const config = require('config')

//config 設定
const port = config.server.port
const host = config.server.host

//Express 作成
const app = express()

//EJS 設定
app.set('ejs', ejs.renderFile)

//JSON
app.use(express.json())

//URLエンコード
app.use(express.urlencoded({ extended: true }))

//静的ファイル有効
app.use(express.static(__dirname + '/public'))

//ルーティング
app.use('/', router)

//ポート:3000待機
app.listen(port, host, () => {
    console.log(`app listen: http://${host}:${port}`)
});