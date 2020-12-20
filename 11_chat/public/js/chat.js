//const url = 'http://localhost:3000';
const url = '';
const chatArea = $('#chatArea');
const loginArea = $('#loginArea');
const message = $('#message');
const myChatList = $('#myChatList');
const userList = $('#userList');
const inputName = $('#inputName');
const iconList = $('#iconList');
const stampList = $('#stampList');
const userName = $('.userName');
const userNumber = $('.userNumber');
const FADE_TIME = 500;
let user = {};
let users = {};

loginArea.hide();
chatArea.hide();
stampList.hide();

//初期設定
$(() => {

    imagePath = (fileName) => {
        let path = 'images/' + fileName;
        return path;
    }

    addMessage = (value) => {
        if (!value) return;
        let messageElement = $('<small>').addClass('text-muted').text(value);
        myChatList.prepend(messageElement);
    }

    updateUserList = () => {
        console.log(users);
        userList.html('');
        $.each(users, function (key, user) {
            let img = $('<img>').attr({ 'src': imagePath(user.icon), 'width': 16 });
            let li = $('<li>').addClass('list-group-item').append(img).append(user.name);
            userList.append(li);
        });

        updateUserNumber = () => {
            let number = Object.keys(users).length;
            if (!number) return;
            userNumber.text(number);
        }
        updateUserNumber();
    }
    createIcons = () => {
        const icons = [...Array(6).keys()].map(i => `${++i}.png`);
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
    createStamps = () => {
        const stamps = [...Array(6).keys()].map(i => `stamp${++i}.png`);
        stamps.forEach((stamp, index) => {
            index++;
            let imageId = 'stamp_' + index;
            let a = $('<a>').attr({ 'stamp': imageId, 'class': 'sendStamp' });
            let img = $('<img>').attr({'id': imageId, 'src': imagePath(stamp), 'width': 100 });
            a.append(img);
            stampList.append(a);
        })

    }

    createIcons();
    createStamps();

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
        let img = $('<img>').attr({ 'src': imagePath(data.user.icon), 'width': 20 });
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

    socket.on('loadStamp', (data) => {
        console.log('loadStamp');
        let img = $('<img width="100">').attr('src', data.image);
        myChatList.prepend(img);
    });

    // ユーザ一覧
    socket.on('show_users', (data) => {
        console.log('show_users');

        users = data.users;
        updateUserList();
    });

    // client からの server へメッセージ
    $('#send').on('click', () => {
        if (!user.token) return;
        if (!message.val()) return;

        socket.emit('client_to_server', {
            message: message.val(),
            user: user,
        });
        message.val('');
    });

    // サーバーへ login
    $('#login').on('click', () => {
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

    $('.stamp').on('click', () => {
        stampList.toggle();
    });

    $('.sendStamp').on('click', (event) => {
        const mime_type = 'image/png';
        const image = new Image();
        image.src = $(event.target).attr('src');
        image.onload = function(event) {
            console.log(event);
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            let base64 = canvas.toDataURL(mime_type);
            let data = { user: user, image: base64 };
            socket.emit('sendStamp', data);
        }
    });

    $('#logout').on('click', () => {
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

   

})
