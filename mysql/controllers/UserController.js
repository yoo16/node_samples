exports.index = (req, res) => {
    let data = {}
    data.title = 'ユーザホーム'
    res.render('user/index.ejs', data)
}
exports.profile = (req, res) => {
    let data = {};
    data.title = 'プロフィール';
    res.render('profile/index.ejs', data);
}