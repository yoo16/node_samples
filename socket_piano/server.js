const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const dotenv = require('dotenv');
dotenv.config();
const host = process.env.HOST
const port = process.env.PORT

const uuidv4 = require('uuid').v4

let users = {};

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
    if (!users) return;
    return users[socket.id];
}

//connection イベント 
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        io.emit('message', data);
    })
    socket.on('play', (data) => {
        socket.broadcast.emit('play', data);
    })
    socket.on('stop', (data) => {
        socket.broadcast.emit('stop', data);
    })

    //ログイン処理
    socket.on('auth', (user) => {
        //トークンがあれば処理しない
        if (user.token) return;

        //トークン発行
        user.token = uuidv4();

        //Socket ID をキーに user を配列に追加
        users[socket.id] = user;

        //data の作成
        let data = { user: user, users: users };
        console.log(user);

        //送信元の「logined」に emit()
        socket.emit('logined', data);

        //ブロードキャストで「user_joined」に emit()
        socket.broadcast.emit('user_joined', data);
    });

    //ログアウト
    socket.on('logout', () => {
        logout(socket);
    });

    socket.on('disconnect', () => {
        logout(socket);
    });

})

http.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`)
})