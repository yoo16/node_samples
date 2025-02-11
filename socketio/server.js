const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const dotenv = require('dotenv');
dotenv.config();
const host = process.env.HOST
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

http.listen(port, host, () => {
    console.log(`listening on http://${host}:${port}`);
})

io.on('connection', (socket) => {
    socket.on('chat_message', (data) => {
        console.log(data);
        data.socketID = socket.id;
        data.time = Date.now();
        io.emit('chat_message', data);
    })
})