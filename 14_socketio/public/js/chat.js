$(() => {
    const url = '';
    let socket = io.connect(url);

    const message = $('#message');
    const myChatList = $('#chatList');

    // メッセージ受信
    socket.on('message', (data) => {
        console.log('message', data)
        let chatElement = $('<p>').append(data.message);
        myChatList.prepend(chatElement);
    });

    // メッセージ送信
    $('#send').on('click', () => {
        if (!message.val()) return;
        socket.emit('message', {
            message: message.val(),
        });
        message.val('');
    });
})