const User = require('../models/User');

exports.index = (req, res) => {
    res.render('login/index')
}

exports.auth = (req, res) => {
    const email = req.body.login_name;
    const password = req.body.password;

    const user = new User();
    const authUser = user.auth(email, password);

    if (authUser) {
        req.session.authUser = authUser;
        res.redirect('/user');
    } else {
        res.redirect('/login');
    }

    // const login_name = req.body.login_name;
    // const password = req.body.password;
    // var message = 'ログインできませんでした';
    // if (login_name == process.env.LOGIN_NAME && password == process.env.PASSWORD) {
    //     message = 'ログインしました';
    // }
    // res.send(message);
}