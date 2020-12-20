//モジュール読み込み
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const config = require('config')
let users = {};

//静的ファイル有効
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

logout = (socket) => {
    console.log('logout');

    let user = fetchUser(socket);
    if (!user) return;

    //ユーザ削除
    delete users[socket.id];

    //送信元以外全てのクライアントに送信
    socket.broadcast.emit('user_left', {
        username: user.name,
        users: users,
    });
}

fetchUser = (socket) => {
    console.log(users);
    if (!users) return;
    return users[socket.id];
}

generateToken = () => {
    let token = Math.random().toString(32).substring(2);
    return token;
}

//connection イベント 
io.on('connection', (socket) => {
    console.log(socket.id);

    // client から server のメッセージ
    socket.on('client_to_server', (data) => {
        data.datetime = new Date();
        console.log(data);
        // server から client へのメッセージ
        io.emit('server_to_client', data);
    })

    socket.on('login', (user) => {
        console.log('login');

        if (user.isConnect) return;
        user.isConnect = true;

        //トークン発行
        user.token = generateToken();

        //Socket ID をキーにユーザ登録
        users[socket.id] = user;

        let data = { user: user, users: users };
        console.log(user);

        //送信元に送信
        socket.emit('logined', data);

        //送信元以外全てのクライアントに送信
        socket.broadcast.emit('user_joined', data);
    });

    //画像
    socket.on('sendStamp', (imageData) => {
        console.log('sendStamp');
        io.emit('loadStamp', imageData);
    });

    //ユーザ一覧
    socket.on('userList', () => {
        console.log('userList');
        console.log(users);
        socket.emit('show_users', {
            users: users,
        });
    });

    //ログアウト
    socket.on('logout', () => {
        console.log('logout');
        logout(socket);
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
        logout(socket);
    });

})

const port = config.server.port;
const host = config.server.host;
http.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`)
})