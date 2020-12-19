const url = 'http://localhost:3000';
const message = $('#message');
const myChatList = $('#myChatList');
const loginUser = $('#loginUser');
const messageArea = $('#messageArea');
const loginArea = $('#loginArea');
const user = { name: '', token: '' };

//初期設定
$(() => {
    messageArea.hide();
})

//サーバー接続
const ioSocket = io.connect(url);

//接続
ioSocket.on('connect', () => {});

//切断
ioSocket.on('disconnect', () => {});

// server から client へメッセージ
ioSocket.on('server_to_client', (data) => {
    appendMessage(data)
});

// client からの server へメッセージ
$('#sendBtn').click(() => {
    if (!user.token) return;
    if (!message.val()) return;

    ioSocket.emit('client_to_server', { 
        message: message.val(),
        user: user,
    });
    clearMessage();
});

function appendMessage(data) {
    const date = new Date(data.datetime);
    const date_string = date.toLocaleString('ja-JP');

    chatStyle = (data.user.token == user.token) ? 'alert alert-info' : 'alert alert-success';
    let message = data.message.replace(/\r?\n/g, '<br>');
    let messageDOM = $('<div>');
    messageDOM.addClass(chatStyle);
    messageDOM.html(message);

    let headerDOM = $('<div>');
    let userDOM = $('<small>');
    userDOM.html(`${data.user.name} : ${date_string}`);
    headerDOM.append(userDOM);

    let chatDOM = $('<div>');
    chatDOM.append(headerDOM);
    chatDOM.append(messageDOM);

    myChatList.prepend(chatDOM);
}

$('#loginBtn').click(() => {
    if (loginUser.val()) {
        login(loginUser.val());
        messageArea.show();
        loginUser.prop('disabled', true);
    }
});

function login(userName) {
    user.name = userName;
    user.token = Math.random().toString(32).substring(2);
}

function clearMessage() {
    message.val('');
}