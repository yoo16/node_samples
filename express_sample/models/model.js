const fs = require('fs');
class Model {

    get = () => {
        var values = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
        return values
    }

    find = (id) => {
        var values = this.get()
        return values.find((value) => value.id == id)
    }
}

module.exports = Model;