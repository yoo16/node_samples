const url = '';
const chatArea = $('#chatArea')
const loginArea = $('#loginArea')
const message = $('#message')
const myChatList = $('#myChatList')
const userList = $('#userList')
const inputName = $('#inputName')
const userName = $('.userName')
const FADE_TIME = 500
let user = {}
let users = {}

//初期設定
$(() => {
    const audioPath = (fileName) => { return 'audio/' + fileName }

    const hasToken = (data) => {
        return (data.user.token == user.token)
    }

    const addMessage = (value) => {
        if (!value) return
        let messageElement = $('<small>').addClass('text-muted pt-2 pb-2').text(value)
        myChatList.prepend(messageElement)
    }
    const updateUserList = () => {
        if (!users) return
        userList.html('')
        $.each(users, (key, user) => {
            let li = $('<li>').addClass('list-group-item').append(user.name)
            userList.append(li)
        })
    }

    var audioCtx = new AudioContext();
    const playOscillator = (note) => {
        var i = note - 60
        var hz = 442 * Math.pow(2, (1 / 12) * (i - 9));

        var osciillator = audioCtx.createOscillator();
        osciillator.frequency.value = hz;
        var audioDestination = audioCtx.destination;
        osciillator.connect(audioDestination);
        osciillator.start = osciillator.start || osciillator.noteOn; //クロスブラウザ対応
        osciillator.start();
        setTimeout(() => {
            osciillator.stop();
        }, 500);
    }

    function sleep(waitMsec) {
        var startMsec = new Date();
        while (new Date() - startMsec < waitMsec);
    }

    const playSound = (note) => {
        //TODO
        var key_id = 'key_' + note
        var audio = document.getElementById(key_id)
        console.log(audio.paused)
        if (!audio.paused) {
            audio.pause()
            audio.currentTime = 0
        }
        audio.play()
    }
    const stopSound = (note) => {
        var key_id = 'key_' + note
        var audio = document.getElementById(key_id)
        console.log(audio.paused)
        if (!audio.paused) {
            setTimeout(() => {
                audio.pause()
                audio.currentTime = 0
            }, 400);
        }
    }

    //初期化
    (() => {
        loginArea.hide()
        chatArea.hide()
        loginArea.fadeIn(FADE_TIME)
    })();

    //サーバー接続
    let socket = io.connect(url)

    socket.on('play', (data) => {
        playSound(data.note)
    })
    socket.on('stop', (data) => {
        stopSound(data.note)
    })

    // ログイン後
    socket.on('logined', (data) => {
        if (data.user) {
            user = data.user
            users = data.users
            userName.text(user.name)
            updateUserList()
        }
    })

    // login情報（ブロードキャスト）
    socket.on('user_joined', (data) => {
        users = data.users
        let message = data.user.name + ' が入室しました'
        addMessage(message)
        updateUserList()
    })

    // ログアウト受信（ブロードキャスト）
    socket.on('user_left', (data) => {
        users = data.users
        let message = data.username + ' が退出しました'
        addMessage(message)
        updateUserList()
    })

    // ログイン
    $('#login').on('click', () => {
        let name = inputName.val();
        if (name) {
            loginArea.hide()
            chatArea.fadeIn(FADE_TIME)
            socket.emit('auth', {
                name: name,
            })
        }
    })

    //play
    $('#keyboard > .key').on('mousedown', (event) => {
        const note = $(event.target).data('note')
        if (!note) return
        socket.emit('play', { note: note, })
    })
    //stop
    $('#keyboard > .key').on('mouseup', (event) => {
        const note = $(event.target).data('note')
        if (!note) return
        socket.emit('stop', { note: note, })
    })

    //ログアウト処理
    $('#logout').on('click', () => {
        socket.emit('logout')
        user = {}
        chatArea.fadeOut(FADE_TIME)
        loginArea.fadeIn(FADE_TIME)
    })

})