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

  static saveNeed(need) {
    return Needs.db.addNeed({
      resident: need.resident,
      need: need.need,
      priority: "Undefined",
      status: "New",
    });
  }
  static update(params, patch) {
    return Needs.db.updateNeed(params, patch);
  }

  static getAll(filter) {
    return Needs.db.getAllNeeds(filter);
  }
}

module.exports = Needs;
