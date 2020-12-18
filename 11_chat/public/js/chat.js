const url = 'http://localhost:3000';
const message = $('#message');
const myChatList = $('#myChatList');
const friendChatList = $('#friendChatList');
const userSelect = $('#userSelect');
const users = [
    { id: 1, name: 'Cat123' },
    { id: 2, name: 'Tokyo88' },
    { id: 3, name: 'Michel' },
    { id: 4, name: 'Anonymous' },
    { id: 5, name: 'King111' },
]
let loginUser = {};

//サーバー接続
const ioSocket = io.connect(url);

//接続
ioSocket.on('connect', () => { });

//切断
ioSocket.on('disconnect', () => { });

//サーバーからクライアントへの送り返し
ioSocket.on('s2c_message', (data) => {
    appendMessage(data)
});

// 自分を含む全員宛にメッセージを送信
$("#sendBtn").click(() => {
    if (!message.val()) return;
    userSelect.prop("disabled", true);
    loginUser = users.find(user => userSelect.val() == user.id);

    ioSocket.emit('c2s_message', { message: message.val(), user_id: userSelect.val() });
    clearMessage();
});

// 自分以外の全員宛にメッセージを送信
$("#broadcastBtn").click(() => {
    if (!message.val()) return;
    userSelect.prop("disabled", true);

    ioSocket.emit("c2s_broadcast", { message: message.val(), user_id: userSelect.val() });
    clearMessage();
});

$(() => {
    users.forEach((user) => {
        let option = $('<option>');
        option.val(user.id).text(user.name);
        userSelect.append(option);
    });
})

function appendMessage(data) {

    const date = new Date(data.datetime);
    const date_string = date.toLocaleString('ja-JP');
    const user = users.find(user => data.user_id == user.id);

    chatStyle = (loginUser.id == user.id) ? 'alert alert-info' : 'alert alert-success';
    let messageDOM = $('<div>');
    messageDOM.addClass(chatStyle)
    messageDOM.text(data.message)

    const header = `${user.name} : ${date_string}`;
    let userNameDOM = $('<small>');
    userNameDOM.text(header)

    let li = $('<li>');
    li.addClass('list-group-item');
    li.append(userNameDOM);
    li.append(messageDOM);

    myChatList.prepend(li);
}

function clearMessage() {
    message.val('');
}