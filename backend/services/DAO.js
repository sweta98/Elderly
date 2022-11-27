let _DB = null; 


class DataAccessObject {

    constructor(){
    }

    static set db(_db){
        _DB = _db;
    }

    static get db() {
        return _DB; 
    }

}

module.exports = DataAccessObject;