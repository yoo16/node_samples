//モジュール読み込み
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const config = require('config');

//config 設定
const port = config.server.port;
const host = config.server.host;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
    console.log("ユーザーが接続しました");

    // 送信元以外のクライアントに送信
    socket.on('c2s_message', (data) => {
        let datetime = new Date();
        io.sockets.emit('s2c_message', { message: data.message, datetime: datetime });
    });

    // すべてのクライアントに送信
    socket.on('c2s_broadcast', (data) => {
        let datetime = new Date();
        socket.broadcast.emit('s2c_message', { message: data.message, datetime: datetime });
    });
});

http.listen(port, host, () => {
    console.log(`listening on ${host}:${port}`);
});