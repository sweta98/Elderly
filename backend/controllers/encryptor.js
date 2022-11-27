const bcrypt = require('bcrypt')


exports.encrypt = function (password){
    return bcrypt.hashSync(password, 10);
}

exports.validate = function (password, toMatch){
    return bcrypt.compareSync(password, toMatch);
}