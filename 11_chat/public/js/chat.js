//const url = 'http://localhost:3000';
const url = '';
const chatArea = $('#chatArea');
const loginArea = $('#loginArea');
const message = $('#message');
const myChatList = $('#myChatList');
const userList = $('#userList');
const inputName = $('#inputName');
const iconList = $('#iconList');
const userName = $('.userName');
const userNumber = $('.userNumber');
const FADE_TIME = 500;
let user = {};
let users = {};

loginArea.hide();
chatArea.hide();

//初期設定
$(() => {

    //サーバー接続
    loginArea.fadeIn(FADE_TIME);
    let socket = io.connect(url, {
        'autoConnect': true,
        'reconnect': true,
    });

    //接続
    socket.on('connect', () => { 
        console.log('connect');
        console.log(socket.id);
        console.log(socket.connected);
    });

    //切断
    socket.on('disconnect', (reason) => {
        console.log('disconnect');
        if (reason === 'io server disconnect') {
            socket.connect();
        }
    });

    // server から client へメッセージ
    socket.on('server_to_client', (data) => {
        console.log('server_to_client');
        if (!user.token) return;
        console.log(data);
        const date_string = new Date(data.datetime).toLocaleString('ja-JP');

        let isToken = (data.user.token == user.token);
        let chatStyle = (isToken) ? 'p-3 balloon-right' : 'p-3 balloon-left';
        let dateStyle = (isToken) ? 'p-3 text-primary' : 'p-1 text-dark';
        let userStyle = (isToken) ? 'text-right' : 'text-left';
        let message = data.message.replace(/\r?\n/g, '<br>');
        let messageElement = $('<div>').addClass(chatStyle).html(message);
        let img = $('<img>').attr({'src': imagePath(data.user.icon), 'width': 20 });
        let userElement = $('<small>').addClass(dateStyle).append(img).append(data.user.name);
        let dateElement = $('<small>').addClass('text-dark').html(date_string);
        let headerElement = $('<p>').addClass(userStyle).append([userElement]);
        let footerElement = $('<div>').addClass('text-right').append(dateElement);
        let chatElement = $('<div>').hide().append([headerElement, messageElement, footerElement]);

        myChatList.prepend(chatElement);
        chatElement.fadeIn(FADE_TIME);
    });

    // server から login 情報取得
    socket.on('logined', (data) => {
        console.log('logined');
        console.log(socket.id);
        if (data.user) {
            user = data.user;
            users = data.users;

            console.log(user);
            console.log(users);

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

    // ログアウト
    socket.on('user_left', (data) => {
        console.log('user_left');
        let message = data.username + ' logout.';
        addMessage(message);

        users = data.users;
        updateUserList();
    });

    // ユーザ一覧
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
        message.val('');
    });

    // サーバーへ login
    $('#login').click(() => {
        user = {};
        if (inputName.val()) {
            loginArea.hide();
            chatArea.fadeIn(FADE_TIME);

            user.name = inputName.val();
            user.icon = $('input[name=icon]:checked').val();
            socket.emit('login', user);
            
            console.log(user);
        }
    });

    $('#logout').click(() => {
        console.log('logout');
        socket.emit('logout');
        user = {};
        chatArea.fadeOut(FADE_TIME);
        loginArea.fadeIn(FADE_TIME);
    });

    $('#users').click(() => {
        console.log('users');
        socket.emit('userList');
    });

    const icons = [...Array(6).keys()].map(i => `${++i}.png`);
    function createIcons() {
        icons.forEach((icon, index) => {
            index++;

            let id = 'icon_' + index;
            let label = $('<label>').attr({ 'for': id });

            let input = $('<input>').attr({ 
                'id': id,
                'name': 'icon',
                'type': 'radio',
                'value': icon,
            });
            if (index == 1) input.attr({ checked: 'checked' });
            label.append(input);

            let img = $('<img>').attr({ 'src': imagePath(icon), 'width': 26 });
            label.append(img);

            iconList.append(label);
        })
    }
    createIcons();

    function imagePath(fileName) {
        let path = 'images/' + fileName;
        return path;
    }

    function addMessage(value) {
        if (!value) return;
        let messageElement = $('<small>').addClass('text-muted').text(value);
        myChatList.prepend(messageElement);
    }

    function updateUserList() {
        updateUserNumber();

        console.log(users);
        userList.html('');
        $.each(users, function (key, user) {
            let img = $('<img>').attr({ 'src': imagePath(user.icon), 'width': 16 });
            let li = $('<li>').addClass('list-group-item').append(img).append(user.name);
            userList.append(li);
        });
    }

    function updateUserNumber() {
        let number = Object.keys(users).length;
        if (!number) return;
        userNumber.text(number);
    }

})
