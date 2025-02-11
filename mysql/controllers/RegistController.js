const User = require('../models/User');

exports.index = (req, res) => {
    var data = {}
    data.title = 'Regist'
    res.render('regist/index', data)
}

exports.add = async (req, res) => {
    //TODO validate
    const user = new User();
    var isSuccess = await user.add(req.body);
    if (isSuccess) {
        res.redirect('/login');
    } else {
        res.redirect('/regist');
    }
}