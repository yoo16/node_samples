const Model = require('./Model')

class User extends Model {
    dataFile = "./data/users.json"; 

    auth = (email, password) => {
        return this.get().find((value) => 
            (value.email == email && value.password == password)
        )
    }

}

module.exports = User