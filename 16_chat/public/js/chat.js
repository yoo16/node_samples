const url = '';
const chatArea = $('#chatArea')
const loginArea = $('#loginArea')
const message = $('#message')
const myChatList = $('#myChatList')
const userList = $('#userList')
const inputName = $('#inputName')
const iconList = $('#iconList')
const stampList = $('#stampList')
const userName = $('.userName')
const checkIcon = $('input[name=icon]:checked')
const FADE_TIME = 500
const STAMP_WIDTH = 150
const IMAGE_WIDTH = 500
let user = {}
let users = {}

//初期設定
$(() => {
    imagePath = (fileName) => { return 'images/' + fileName }

    addMessage = (value) => {
        if (!value) return
        let messageElement = $('<small>').addClass('text-muted pt-2 pb-2').text(value)
        myChatList.prepend(messageElement)
    }
    updateUserList = () => {
        if (!users) return
        userList.html('')
        $.each(users, (key, user) => {
            let img = $('<img>').attr({ src: imagePath(user.icon), class: 'icon' })
            let li = $('<li>').addClass('list-group-item').append(img).append(user.name)
            userList.append(li)
        })
    }
    createIcons = () => {
        const icons = [...Array(6).keys()].map(i => `${++i}.png`)
        icons.forEach((icon, index) => {
            index++

            let id = 'icon_' + index
            let label = $('<label>').attr({ for: id })
            let input = $('<input>').attr({ id: id, name: 'icon', type: 'radio', value: icon })
            if (index == 1) input.attr({ checked: 'checked' })
            let img = $('<img>').attr({ src: imagePath(icon), class: 'icon' })

            label.append([input, img])
            iconList.append(label)
        })
    }
    createStamps = () => {
        const stamps = [...Array(6).keys()].map(i => `stamp${++i}.png`)
        stamps.forEach((stamp, index) => {
            index++
            let imageId = 'stamp_' + index
            let a = $('<a>').attr({ stamp: imageId, class: 'uploadStamp' })
            let img = $('<img>').attr({ id: imageId, src: imagePath(stamp), class: 'stamp' })
            a.append(img)
            stampList.append(a)
        })
    }
    createHeaderElement = (data, isMyself) => {
        let dateStyle = (isMyself) ? 'p-3 text-primary' : 'p-1 text-dark'
        let userStyle = (isMyself) ? 'text-end' : 'text-start'
        let img = $('<img>').attr({ src: imagePath(data.user.icon), class: 'icon' })
        let userElement = $('<small>').addClass(dateStyle).append(img).append(data.user.name)
        let headerElement = $('<p>').addClass(userStyle).append([userElement])
        return headerElement
    }
    createFooterElement = (data, isMyself) => {
        const date_string = new Date(data.datetime).toLocaleString('ja-JP')
        let dateStyle = (isMyself) ? 'text-end' : 'text-start'
        let dateElement = $('<small>').addClass('text-muted').html(date_string)
        let footerElement = $('<div>').addClass(dateStyle).append(dateElement)
        return footerElement
    }
    createMessageElement = (data, isMyself) => {
        let chatStyle = (isMyself) ? 'p-3 balloon-right' : 'p-3 balloon-left'
        let message = data.message.replace(/\r?\n/g, '<br>')
        let messageElement = $('<div>').addClass(chatStyle).html(message)
        return messageElement
    }
    createChatMessage = (data) => {
        let isMyself = hasToken(data)
        let headerElement = createHeaderElement(data, isMyself)
        let messageElement = createMessageElement(data, isMyself)
        let footerElement = createFooterElement(data, isMyself)
        let chatElement = $('<div>').hide().append([headerElement, messageElement, footerElement])

        myChatList.prepend(chatElement)
        chatElement.fadeIn(FADE_TIME)
    }
    createChatImage = (data, params) => {
        let isMyself = hasToken(data)
        let headerElement = createHeaderElement(data, isMyself)
        let img = $('<img>').attr('src', data.image).attr('width', params.width)
        let messageElement = $('<div>').addClass('text-center').append(img)
        let footerElement = createFooterElement(data, isMyself)
        let chatElement = $('<div>').hide().append([headerElement, messageElement, footerElement])

        myChatList.prepend(chatElement)
        chatElement.fadeIn(FADE_TIME)
    }
    hasToken = (data) => {
        return (data.user.token == user.token)
    }

    //初期化
    (() => {
        createIcons()
        createStamps()
        loginArea.hide()
        chatArea.hide()
        stampList.hide()
        loginArea.fadeIn(FADE_TIME)
    })();

    //サーバー接続
    let socket = io.connect(url)

    // メッセージ受信
    socket.on('message', (data) => {
        createChatMessage(data)
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

    // スタンプ読み込み
    socket.on('load_stamp', (data) => {
        createChatImage(data, { width: STAMP_WIDTH })
    })

    // 画像読み込み
    socket.on('load_image', (data) => {
        createChatImage(data, { width: IMAGE_WIDTH })
    })

    // メッセージ送信
    $('#send').on('click', () => {
        if (!user.token) return
        if (!message.val()) return

        socket.emit('message', {
            message: message.val(),
            user: user,
        })
        message.val('')
    })

    // ログイン
    $('#login').on('click', () => {
        let name = inputName.val();
        let icon = $('input[name=icon]:checked').val()
        if (name && icon) {
            loginArea.hide()
            chatArea.fadeIn(FADE_TIME)
            socket.emit('auth', { name: name, icon: icon, })
        }
    })

    $('.stamp').on('click', () => {
        stampList.toggle()
    })

    //スタンプアップロード
    $('.uploadStamp').on('click', (event) => {
        const mime_type = 'image/png'
        const image = new Image()
        image.src = $(event.target).attr('src')
        image.onload = (e) => {
            const canvas = document.createElement('canvas')
            canvas.width = image.naturalWidth
            canvas.height = image.naturalHeight
            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0)
            let base64 = canvas.toDataURL(mime_type)
            let data = { user: user, image: base64 }
            socket.emit('upload_stamp', data)
            stampList.toggle()
        }
    })

    //画像アップロード
    $('.uploadImage').on('change', (event) => {
        let file = event.target.files[0]
        let fileReader = new FileReader()
        fileReader.onloadend = () => {
            let data = {}
            data.image = fileReader.result
            data.user = user
            socket.emit('upload_image', data)
        }
        fileReader.readAsDataURL(file)
        $('.uploadImage').val('')
    })

    //ログアウト処理
    $('#logout').on('click', () => {
        socket.emit('logout')
        user = {}
        chatArea.fadeOut(FADE_TIME)
        loginArea.fadeIn(FADE_TIME)
    })

})