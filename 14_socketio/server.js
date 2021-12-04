const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const config = require('config')

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    // client からの受信
    socket.on('client_to_server', (data) => {
        console.log(data);
        // client へ送信
        io.emit('server_to_client', data)
    })
})

const port = config.server.port
const host = config.server.host
http.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`)
})