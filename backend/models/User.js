const {isBanned} = require('../controllers/bannedUsername')
const DAO = require('../services/DAO')

const usernameRegexRule = /^[a-zA-Z0-9_.]{3,}$/
const passwordRegexRule = /^(.){4,}$/

class User {
    constructor(user){
        if (!User.checkUsernameFormat(user.username))
            throw {message: "Username should be 3 or more characters"};
        if (User.checkUsernameBanned(user.username))
            throw {message: "Username is banned"};
        if (!User.checkPasswordFormat(user.password))
            throw {message: "Password should be 4 or more characters"};
        
        this.username = user.username
        this.password = user.password
        this.status = user.status
        this.role   = user.role
    }

    static checkUsernameBanned(username){
        return isBanned(username);
    }

    static checkUsernameFormat(username) {
        return username.match(usernameRegexRule);
    }

    static checkPasswordFormat(password) {
        return password.match(passwordRegexRule);
    }

    static get db(){
        return DAO.db;
    }

    save(){
        return User.db.addUser({
            username: this.username,
            password: this.password,
            status  : this.status,
            role    : this.role
        });
    }

    static validate(username, password){
        return User.db.validateUser(username, password);
    }

    static signIn(username){
        return User.db.signIn(username);
    }

    static signOut(username){
        return User.db.signOut(username);
    }

    static get(username) {
        return User.db.findUserByUsername(username);
    }

    static update(username, patch){
        return User.db.updateUserByUsername(username, patch);
    }

    static getAll() {
        return User.db.getAllUser();
    }

    static delAll() {
        return User.db.delAllUser();
    }

    static paginateUser(query, options){
        return User.db.paginateUser(query, options);
    }

    /* Admin */
    static getForAdmin(username) {
        return User.db.findUserByUsernameForAdmin(username);
    }

    static updateForAdmin(username, patch){
        if (patch.username){
            if (!User.checkUsernameFormat(patch.username))
                throw {message: "Username should be 3 or more characters"};
            if (User.checkUsernameBanned(patch.username))
                throw {message: "Username is banned"};
        }
        if (patch.password){
            if (!User.checkPasswordFormat(patch.password))
                throw {message: "Password should be 4 or more characters"};
        }

        return User.db.updateUserByUsernameForAdmin(username, patch);
    }

    static getAllForAdmin() {
        return User.db.getAllUserForAdmin();
    }



}

module.exports = User;