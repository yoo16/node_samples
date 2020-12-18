//モジュール読み込み
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const config = require('config');

//config 設定
const port = config.server.port;
const host = config.server.host;

//JSON
app.use(express.json())

//URLエンコード
app.use(express.urlencoded({ extended: true }))

//静的ファイル有効
app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
    console.log('ユーザーが接続しました');

    // 送信元以外のクライアントに送信
    socket.on('c2s_message', (data) => {
        let datetime = new Date();
        io.sockets.emit('s2c_message', { 
            message: data.message,
            user_id: data.user_id,
            datetime: datetime,
        });
    });

    // すべてのクライアントに送信
    socket.on('c2s_broadcast', (data) => {
        let datetime = new Date();
        socket.broadcast.emit('s2c_message', {
            message: data.message,
            user_id: data.user_id,
            datetime: datetime
        });
    });
});

http.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`);
});