const nedb = require('nedb');

class TrainingGoals {

    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    getAllEntries() {
        return new Promise(( resolve, reject) => {
            this.db.find({}, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('function all() return: ', entries);
                }
            })
        })
    }

    addEntry(user, date, goal, goalBreakdown, achievements) {
        var entry = {
            user: user,
            date: date,
            goal: goal,
            goalBreakdown: goalBreakdown,
            achievements: achievements,
            published: new Date(published).toISOString().split('T')[0]
            }
                console.log('entry created', entry);
                this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', subject);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    getEntriesByUser(user) {
            return new Promise((resolve, reject) => {
                this.db.find({ 'user': user }, function(err, entries) {
            if (err) {
                reject(err);
            } else {
                resolve(entries);
                console.log('getEntriesByUser returns: ', entries);
                }
            })
        })
    }

    deleteEntriesByUser() {
        this.db.remove({'user': user}, {}, function(err, docsRem) {
            if (err) {
                console.log('Error deleting user entry.');
            } else {
                console.log(docsRem, 'Entry removed from the database');
            }
        })
    }

    updateEntriesByUser() {
        this.db.update({'user': user}, {}, function(err, docsRem) {
            if (err) {
                console.log('Error updating user entry.');
            } else {
                console.log(docsRem, 'Entry updated in the database for user: ' + user);
            }
        })
    }
       
}

module.exports = TrainingGoals;