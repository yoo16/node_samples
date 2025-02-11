const Tweet = require('../models/Tweet');

exports.index = async (req, res) => {
    var tweet = new Tweet();
    var tweets = await tweet.get();
    var json = JSON.stringify(tweets);
    res.send(json);
}

exports.show = async (req, res) => {
    const id = req.params.id;
    var tweet = new Tweet();
    var tweets = await tweet.find(id);
    var json = JSON.stringify(tweets);
    res.send(json);
}