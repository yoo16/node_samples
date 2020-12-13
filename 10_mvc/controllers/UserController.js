const config = require('config');

exports.index = (req, res) => {
    let data = { title: 'User Page' }
    res.render('user/index.ejs', data)
}

exports.login = (req, res) => {
    let data = { title: 'Login Page' }
    res.render('user/login.ejs', data)
}

exports.logout = (req, res) => {
    res.redirect('user/login');
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