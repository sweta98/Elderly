const DAO = require('../services/DAO')

class Wish{
    constructor(wish){
        this.userid  = wish.userid;
        this.content = wish.content;
        this.status = "Wished";
    }

    static get db(){
        return DAO.db;
    }

    save(){
        return Wish.db.addWish({
            userid: wish.userid,
            content: wish.content,
            status: wish.status,
            timestamp: wish.timestamp,
            priority: wish.priority,
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