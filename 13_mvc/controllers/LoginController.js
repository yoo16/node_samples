
exports.index = (req, res) => {
    let data = {}
    data.title = 'ログイン'
    data.layout = 'layouts/login'
    res.render('login/index.ejs', data)
}

exports.auth = (req, res) => {
    const login_name = req.body.login_name;
    const password = req.body.password;

    if (login_name == process.env.LOGIN_NAME
         && password == process.env.PASSWORD) {
        res.redirect('/user');
    } else {
        res.redirect('/login');
    }
}

exports.logout = (req, res) => {
    res.redirect('login/');
}
