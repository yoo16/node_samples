const User = require('../models/User');

exports.index = (req, res) => {
    var data = {}
    data.title = 'ログイン'
    res.render('login/index.ejs', data)
}

exports.auth = async (req, res) => {
    //TODO validate

    const email = req.body.email;
    const password = req.body.password;

    const user = new User();
    req.session.user = await user.auth(email, password)

    if (req.session.user) {
        res.redirect('/user');
    } else {
        res.redirect('/login');
    }
}

exports.logout = (req, res) => {
    delete(req.session.user);
    res.redirect('login/');
}
