exports.index = (req, res) => {
    let data = {}
    data.title = 'トップページ';
    res.render('index.ejs', data);
}

exports.profile = (req, res) => {
    let user = {
        id: 1,
        name: '横浜　太郎',
        birthplace: '横浜',
        hobby: ['旅行', 'グルメ', 'スポーツ'],
    }
    let data = {};
    data.title = 'プロフィール';
    data.user = user;

    res.render('profile/index.ejs', data);
}