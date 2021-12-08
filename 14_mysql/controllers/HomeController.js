const user = require('../models/user')

exports.index = (req, res) => {
    let data = {}
    data.title = 'トップページ';
    res.render('index.ejs', data);
}

exports.profile = (req, res) => {
    let data = {};
    data.title = 'プロフィール';
    data.user = {
        id: 1,
        name: '横浜　太郎',
        birthplace: '横浜',
        hobby: ['旅行', 'グルメ', 'スポーツ'],
    }
    res.render('profile/index.ejs', data);
}