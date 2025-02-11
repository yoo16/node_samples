const Item = require('../models/Item');

exports.index = (req, res) => {
    res.render('index')
}

exports.profile = (req, res) => {
    res.redirect('profile')
}