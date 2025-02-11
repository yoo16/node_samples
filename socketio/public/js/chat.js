const url = '';
const socket = io.connect(url);

// メッセージ受信
socket.on('chat_message', (data) => {
    console.log('message', data)

    var chatList = document.getElementById('chatList');
    var div = document.createElement('div');
    var dateElement = document.createElement('span');
    var userElement = document.createElement('span');
    var messageElement = document.createElement('p');

    dateElement.innerText = dateFormat(data.time);
    dateElement.classList.add(['pe-3']);

    messageElement.innerText = data.message;

    userElement.innerText = data.socketID;
    userElement.classList.add(['text-muted'])

    div.append(dateElement);
    div.append(userElement);
    div.append(messageElement);

    chatList.prepend(div);
});

function sendMessage() {
    var message = document.getElementById('message').value;
    if (!message) return;
    var data = {
        message: message,
    };
    socket.emit('chat_message', data);
    document.getElementById('message').value = "";
}

function dateFormat(time) {
    var date = new Date(time);
    var dateString = date.toLocaleDateString('ja-JP');
    var timeString = date.toLocaleTimeString('ja-JP');
    var dateFormat = `${dateString} ${timeString}`;
    return dateFormat
}