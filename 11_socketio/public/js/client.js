//初期設定
$(() => {
    //const url = 'http://localhost:3000';
    const url = '';
    const message = $('#message');
    const myChatList = $('#myChatList');
    const broadcastChatList = $('#broadcastChatList');

    //サーバー接続
    let socket = io.connect(url);

    //接続
    socket.on('connect', () => {
        console.log('connect');
        console.log(socket.id);
        console.log(socket.connected);
    });

    //切断
    socket.on('disconnect', (reason) => {
        console.log('disconnect');
    });

    // server から client へ送信
    socket.on('server_to_client', (data) => {
        console.log('server_to_client');
        let chatElement = $('<p>').append(data.message);
        myChatList.prepend(chatElement);
    });

    // server から client へ broadcast で送信
    socket.on('server_to_client_broadcast', (data) => {
        console.log('server_to_client_broadcast');
        let chatElement = $('<p>').append(data.message);
        broadcastChatList.prepend(chatElement);
    });

    // send ボタンクリック
    $('#send').on('click', () => {
        if (!message.val()) return;
        // server へ送信
        socket.emit('client_to_server', {
            message: message.val(),
        });
        message.val('');
    });
})
