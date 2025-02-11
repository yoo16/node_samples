const Item = require('../models/Item');

exports.index = (req, res) => {
    const item = new Item()
    var data = {
        items: item.get()
    }
    res.render('item/index', data)
}

exports.show = (req, res) => {
    const id = req.params.id;
    const item = new Item();
    var data = {
        item: item.find(id)
    }
    res.render('item/show', data)
}