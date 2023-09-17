const item = require('../models/item');

exports.index = (req, res) => {
    let data = { items: item.values };
    data.title = '商品一覧';
    res.render('item/index.ejs', data);
}

exports.show = (req, res) => {
    const id = req.params.id;

    let data = {};
    data.item = item.find(id);
    data.title = '商品情報';
    data.message = ''

    if (!data.item) data.message = '商品が見つかりませんでした';
    res.render('item/show.ejs', data);
}