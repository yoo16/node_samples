exports.index = (req, res) => {
    res.render('index.ejs', { title: 'Index Page' })
}

exports.about = (req, res) => {
    res.render('about.ejs', { title: 'About Page' })
}