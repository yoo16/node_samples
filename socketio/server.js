const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

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
    socket.on('message', (data) => {
        console.log(data);
        io.emit('message', data);
    })
})