//モジュール読み込み
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const config = require('config')

//静的ファイル有効
app.use(express.static(__dirname + '/public'))

//connection イベント 
io.on('connection', (socket) => {
    console.log('client connect.');

    // client から server のメッセージ
    socket.on('client_to_server', (data) => {
        data.datetime = new Date();
        // server から client へのメッセージ
        io.sockets.emit('server_to_client', data);
    })
})

const port = config.server.port;
const host = config.server.host;
http.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`)
})