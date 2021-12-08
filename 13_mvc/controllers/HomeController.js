const user = require('../models/user')

exports.index = (req, res) => {
    let data = {}
    data.title = 'トップページ';
    res.render('index.ejs', data);
}

exports.profile = (req, res) => {
    let data = {};
    data.title = 'プロフィール';
    data.user = user.find(1);

    res.render('profile/index.ejs', data);
}