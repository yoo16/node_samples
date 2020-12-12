const express = require('express')
const ejs = require('ejs')
const config = require('config')
const layouts = require('express-ejs-layouts')

const routes = require('./routes')

const port = config.server.port
const host = config.server.host

const app = express()

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.use(layouts)
app.use(routes)


//ポート:3000待機
app.listen(port, host, () => {
    console.log(`app listen: http://${host}:${port}`)
});