const item = require('../models/item');

exports.index = async (req, res) => {
    let data = {};
    data.title = '商品一覧';
    data.items = await item.get();
    res.render('item/index.ejs', data);
}

exports.show = async (req, res) => {
    const id = req.params.id;

    let data = {};
    data.title = '商品情報';
    data.item = await item.find(id);

    res.render('item/show.ejs', data);
}