exports.index = (req, res) => {
    let data = {}
    data.title = 'ユーザホーム'
    res.render('user/index.ejs', data)
}