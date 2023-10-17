const fs = require('fs');
var values;

exports.init = (file) => {
    values = JSON.parse(fs.readFileSync(file, 'utf8'));
}

exports.get = () => {
    return values
}

exports.find = (id) => {
    return values.find((value) => value.id == id)
}

module.exports = model;