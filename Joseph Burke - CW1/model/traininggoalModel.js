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

    init () {
        this.db.insert({
            date: '2021-01-16',
            goal: 'Arms',
            goalBreakdown: {
                "goal1": "I need to do arm excersises.",
                "goal2": "I need to eat the correct food.",
                "goal3": "I need to sleep well."
            },
            achievements: {
                "ach1": "If I complete this goal I'll get nice arms!",
                "ach2": "If I complete this goal I'll be happy!",
                "ach3": "If I complete this goal I'll not have small arms!"
            },
            user: 'Jango'
        });
        console.log('db entry Jango inserted');

        this.db.insert({
            date: '2021-02-18',
            goal: 'Abs',
            goalBreakdown: {
                "goal1": "I need to do ab excersises.",
                "goal2": "I need to eat the correct food.",
                "goal3": "I need to sleep well."
            },
            achievements: {
                "ach1": "If I complete this goal I'll get nice abs!",
                "ach2": "If I complete this goal I'll be happy!",
                "ach3": "If I complete this goal I'll have abs!"
            },
            user: 'Jeremy'
        });
        console.log('db entry Jeremy inserted');
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

    // getPetersEntries() {
    //     return new Promise((resolve, reject) => {
    //         this.db.find({author: 'Peter'}, function(err, entries) {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 resolve(entries);
    //                 console.log('function getPetersEntries() returns', entries);
    //             }
    //         })
    //     })
    // }

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
        this.db.update({ 'user': user,  }, )
    }
       
}

module.exports = TrainingGoals;