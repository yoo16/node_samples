exports.index = (req, res) => {
    let data = { title: 'Index Page' };
    res.render('home/index.ejs', data)
}

exports.about = (req, res) => {
    let data = { title: 'About Page' }
    res.render('home/about.ejs', data)
}