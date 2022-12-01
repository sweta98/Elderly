const DAO = require("../services/DAO");
class Needs {
  constructor(need) {
    this.resident = need.resident;
    this.need = need.need;
    this.priority = need.priority;
    this.status = need.status;
  }

  static get db() {
    return DAO.db;
  }

  save() {
    return Needs.db.addNeed({
      resident: this.resident,
      need: this.need,
      priority: this.priority,
      status: this.status,
    });
  }

  static update(username, patch) {
    return Needs.db.updateNeed(username, patch);
  }

  static getAll() {
    return Needs.db.getAllNeeds();
  }
}

module.exports = Needs;
