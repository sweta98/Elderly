const DAO = require('../services/DAO')

class Wish{
    constructor(wish){
        this.userid  = wish.userid;
        this.content = wish.content;
    }

    static get db(){
        return DAO.db;
    }

    save(){
        return Wish.db.addWish({
            userid: this.userid,
            content: this.content,
            // status: this.status,
            // timestamp: this.timestamp,
            // priority: this.priority,
        });
    }

    static getAll(){
        return Wish.db.getAllWish();
    }

    static paginateAnnouncement(query, options){
        return Wish.db.paginateWish(query, options);
    }

}

module.exports = Wish;