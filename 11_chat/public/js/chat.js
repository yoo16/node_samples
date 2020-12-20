const url = 'http://localhost:3000';
const chatArea = $('#chatArea');
const loginArea = $('#loginArea');
const message = $('#message');
const myChatList = $('#myChatList');
const userList = $('#userList');
const inputName = $('#inputName');
const userName = $('.userName');
const userNumber = $('.userNumber');
const FADE_TIME = 500;
let user = {};
let users = {};

loginArea.hide();
chatArea.hide();

//初期設定
$(() => {
    loginArea.fadeIn(FADE_TIME);
})

//サーバー接続
const socket = io.connect(url);

//接続
socket.on('connect', () => { });

//切断
socket.on('disconnect', (data) => {
    console.log('disconnect');
    updateUserNumber(data.userNumber);
});

// server から client へメッセージ
socket.on('server_to_client', (data) => {
    if (!user.token) return;
    console.log(data);
    const date_string = new Date(data.datetime).toLocaleString('ja-JP');

    chatStyle = (data.user.token == user.token) ? 'alert alert-info' : 'alert alert-success';
    let message = data.message.replace(/\r?\n/g, '<br>');
    let messageElement = $('<div>').addClass(chatStyle).html(message);
    let userElement = $('<small>').html(`${data.user.name} : ${date_string}`);
    let headerElement = $('<div>').append(userElement);
    let chatElement = $('<div>').hide().append([headerElement, messageElement]);

    myChatList.prepend(chatElement);
    chatElement.fadeIn(FADE_TIME);
});

// server から login 情報取得
socket.on('logined', (data) => {
    console.log('logined');
    if (data.user) {
        user = data.user;
        users = data.users;

        userName.text(user.name);
        updateUserList();
    }
});

// login 情報（ブロードキャスト）
socket.on('user_joined', (data) => {
    console.log('user_joined');
    if (data.user && data.users) {
        let message = data.user.name + ' joined.';
        addMessage(message);

        users = data.users;
        updateUserList();
    }
});

socket.on('user_left', (data) => {
    console.log('user_left');
    let message = data.username + ' logout.';
    addMessage(message);

    users = data.users;
    updateUserList();
});

socket.on('show_users', (data) => {
    console.log('show_users');

    users = data.users;
    updateUserList();
});

// client からの server へメッセージ
$('#send').click(() => {
    if (!user.token) return;
    if (!message.val()) return;

    socket.emit('client_to_server', {
        message: message.val(),
        user: user,
    });
    clearMessage();
});

// サーバーへ login
$('#login').click(() => {
    if (inputName.val()) {
        loginArea.hide();
        chatArea.fadeIn(FADE_TIME);

        user.name = inputName.val();
        socket.emit('login', user);
    }
});

$('#logout').click(() => {
    console.log('logout');
    socket.emit('logout');
    chatArea.fadeOut(FADE_TIME);
    loginArea.fadeIn(FADE_TIME);
});

$('#users').click(() => {
    console.log('users');
    socket.emit('userList');
});

function addMessage(value) {
    if (!value) return;
    let messageElement = $('<small>').text(value);
    myChatList.prepend(messageElement);
}

function updateUserList() {
    updateUserNumber();

    console.log(users);
    userList.html('');
    $.each(users, function(key, user) {
        let li = $('<li>').addClass('list-group-item').text(user.name);
        userList.append(li);
    });
}

function updateUserNumber() {
    let number = Object.keys(users).length;
    if (!number) return;
    userNumber.text(number);
}

function clearMessage() {
    message.val('');
}