const DAO = require("../services/DAO");

class Wish {
  constructor(wish) {
    this.username = wish.username;
    this.content = wish.content;
    this.priority = wish.priority;
    this.status = wish.status;
  }

  static get db() {
    return DAO.db;
  }

  static save(wish) {
    return Wish.db.addWish({
      username: wish.username,
      content: wish.content,
      priority: "Undefined",
      status: "New",
    });
  }
  static update(params, patch) {
    return Wish.db.updateWish(params, patch);
  }

  static getAll() {
    return Wish.db.getAllWishes();
  }
}

module.exports = Wish;
