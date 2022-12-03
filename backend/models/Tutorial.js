const DAO = require('../services/DAO')

class Tutorial {
    constructor(tutorial){
        this.app = tutorial.app
        this.videoId = tutorial.videoId
        this.enabled = tutorial.enabled
    }

    static get db(){
        return DAO.db;
    }

    save(){
        return Tutorial.db.addTutorial({
            app: this.app,
            videoId: this.videoId,
            enabled: this.enabled
        });
    }

    static get(appName) {
        return Tutorial.db.getTutorial(appName);
    }

    static getAll() {
        return Tutorial.db.getAllTutorial();
    }

    static getAllEnabled() {
        return Tutorial.db.getAllEnabledTutorial();
    }

    static enable(appName) {
        return Tutorial.db.enableTutorial(appName);
    }

    static disable(appName) {
        return Tutorial.db.disableTutorial(appName);
    }

}

module.exports = Tutorial;