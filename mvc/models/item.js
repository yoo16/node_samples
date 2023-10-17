const model = require('./model');
const dataFile = "./data/items.json";

model.init(dataFile)

module.exports = model;