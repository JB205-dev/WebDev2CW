const nedb = require('nedb');
const db = new nedb({ filename: 'training.db', autoload: true});
console.log('db created');


    db.insert({
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

    db.insert({
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