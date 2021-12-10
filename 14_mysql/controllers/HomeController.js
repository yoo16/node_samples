exports.index = (req, res) => {
    let data = {}
    data.title = 'トップページ';
    res.render('index.ejs', data);
}