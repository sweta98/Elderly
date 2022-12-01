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
        this.Wish = require('./mongoose/wishModel')
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

    /* Wish */
    addWish(wish) {
        const newWish = new this.Wish({
            // userid: mongoose.Types.ObjectId(wish.userid), TODO: change back when User feature complete
            userid: wish.userid,
            content: wish.content,
            timestamp: wish.timestamp,
            status: "wished",
        });
        try {
            return newWish.save()
        } catch (err) {
            throw { status: 501, message: err };
        }
    }

    getAllWish() {
        return this.Wish.find()
            .select("userid content timestamp")
            // .populate("userid", "username")
            .sort({ "time": -1 })
            .then(wishes => {
                return wishes
            }).catch(err => {
                throw err;
            })
    }

    paginateWish(query, options) {
        return this.Wish.paginate({ content: { $regex: query.query, $options: 'i' } }, options)
            .then(results => {
                return results
            })
            .catch(err => {
                throw err;
            })
    }
}

module.exports = DBMongo;