//モジュール読み込み
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const config = require('config')
let users = {};

logout = (socket) => {
    if (!users) return;
    let user = users[socket.id];

    if (!user) return;
    delete users[socket.id];
    socket.broadcast.emit('user_left', {
        username: user.name,
        users: users,
    });
}

//静的ファイル有効
app.use(express.static(__dirname + '/public'))

//connection イベント 
io.on('connection', (socket) => {
    let isConnect = false;

    // client から server のメッセージ
    socket.on('client_to_server', (data) => {
        data.datetime = new Date();
        console.log(data);
        // server から client へのメッセージ
        io.sockets.emit('server_to_client', data);
    })

    socket.on('login', (user) => {
        console.log('login');
        if (isConnect) return;
        isConnect = true;

        //セッションに　username 登録
        socket.username = user.name;

        //トークン発行
        user.token = Math.random().toString(32).substring(2);

        //Socket ID をキーにユーザ登録
        users[socket.id] = user;

        console.log(user);

        socket.emit('logined', {
            user: user,
            users: users,
        });
        socket.broadcast.emit('user_joined', {
            user: user,
            users: users,
        });
    });

    socket.on('userList', () => {
        console.log('userList');
        console.log(users);
        socket.emit('show_users', {
            users: users,
        });
    });

    socket.on('logout', () => {
        console.log('logout');
        isConnect = false;
        logout(socket);
    });

    socket.on('disconnect', () => {
        isConnect = false;
        console.log('disconnect');
        logout(socket);
    });

})

const port = config.server.port;
const host = config.server.host;
http.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`)
})