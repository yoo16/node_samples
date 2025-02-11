const Item = require('../models/Item');

exports.index = (req, res) => {
    //セッションからユーザ取得
    var authUser = req.session.authUser;
    if (!authUser) {
        //ユーザがいなければ、ログインページにリダイレクト
        res.redirect('/login')
    }
    var data = {
        user: authUser,
    }
    res.render('user/index', data)
}

exports.logout = (req, res) => {
    delete(req.session.authUser)
    res.redirect('/login')
}