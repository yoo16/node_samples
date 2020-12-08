const config = require('config');

exports.index = (req, res) => {
    res.render('user.ejs', { title: 'User Page' })
}

exports.login = (req, res) => {
    res.render('login.ejs', { title: 'Login' })
}

exports.logout = (req, res) => {
    res.redirect('/login');
}

exports.auth = (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;

    if (login_name == config.user.login_name
         && password == config.user.password) {
        res.redirect('/user');
    } else {
        res.redirect('/login');
    }
}