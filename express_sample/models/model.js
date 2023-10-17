const fs = require('fs');

exports.dataFile = "";

exports.get = () => {
    var values = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
    return values
}

exports.find = (id) => {
    var values = this.get()
    return values.find((value) => value.id == id)
}

module.exports = this;