const fs = require('fs');
const jsonFile = "./data/users.json";
const values = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

exports.get = () => {
    return values
}

exports.find = (id) => {
    return values.find((value) => value.id == id)
}