const mongoose = require('mongoose')
const encryptor = require('../controllers/encryptor')
const DBURL = "mongodb+srv://sridelderly:18658svgenie@maincluster.ovf8aqy.mongodb.net/?retryWrites=true&w=majority"

class DBMongo {
    constructor() {
        if (!this.stopAllConnections()) {
            console.error('Could not stop all connections')
            return;
        }

        // Connect to the main DB
        mongoose.connect(DBURL).then(() => 
        console.log(`Main Database Connected: ${DBURL}`))
        .catch(err => console.error('Main Database refused to connect：', err));

        this.User = require('./mongoose/userModel');
        this.Tutorial = require('./mongoose/tutorialModel');
    }

    async stopAllConnections() {
        const state = mongoose.connection.readyState;
        if (state == 1 || state == 2) {
            const connectionStopped = await mongoose.connection.close().then(() => {
            }).then(() => {
                return true;
            }).catch(err => {
                console.error('Database refused to connect：', err);
            });
            return connectionStopped;
        }
        return true;

    }

    /*  USER  */

    addUser(user) {
        const newUser = new this.User({
            username: user.username,
            role: user.role,
            status: user.status
        });
        newUser.setPassword(user.password);
        try {
            return newUser.save()
        } catch (err) {
            throw err;
        }
    }

    validateUser(username, password) {
        return this.User.findOne({ username: username})
            .then(user => {
                if (!user || !user.validPassword(password)) {
                    throw { message: 'Authentication failed. Invalid user or password.' };
                }
                return user;
            }).catch(err => {
                throw err;
            });
    }


    /* TUTORIAL */

    addTutorial(tutorial) {
        const newTutorial = new this.Tutorial({
            app: tutorial.app,
            videoId: tutorial.videoId,
            enabled: tutorial.enabled
        });
        try {
            return newTutorial.save()
        } catch (err) {
            throw err;
        }
    }

    getTutorial(appName) {
        return this.Tutorial.findOne({ app: appName });
    }

    getAllTutorial() {
        return this.Tutorial.find().sort( {app: "asc"} );
    }

    getAllEnabledTutorial() {
        return this.Tutorial.find({ enabled: true }).sort( {app: "asc"} );
    }

    enableTutorial(appName) {
        return this.Tutorial.findOneAndUpdate({ app: appName }, { enabled: true }, { new: true });
    }

    disableTutorial(appName) {
        return this.Tutorial.findOneAndUpdate({ app: appName }, { enabled: false }, { new: true });
    }
}

module.exports = DBMongo;