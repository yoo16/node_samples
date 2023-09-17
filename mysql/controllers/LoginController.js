const user = require('../models/user')

exports.index = (req, res) => {
    let data = {}
    data.title = 'ログイン'
    data.layout = 'layouts/login'
    res.render('login/index.ejs', data)
}

exports.auth = async (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;

    //セッション保存
    req.session.user = await user.auth(login_name, password)
    //リダイレクト
    if (req.session.user) {
        res.redirect('/user');
    } else {
        res.redirect('/login');
    }
}

exports.logout = (req, res) => {
    req.session.user = null;
    res.redirect('login/');
}
