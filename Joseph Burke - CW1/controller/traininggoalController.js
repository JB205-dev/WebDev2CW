const guestbookDAO = require('../model/traininggoalModel');
const db = new guestbookDAO();
// db.init();

exports.entries_list = function(req, res) {
    // res.send('<h1>Not yet implemented: show a list of guest book entries.</h1>');
    db.getAllEntries();
}

exports.landing_page = function(req, res) {
    db.getAllEntries().then((list) => {
        res.render('entries', {
            'title': 'Training Goal Tracker',
            'entries': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}

exports.show_user_entries = function(req, res) {
    console.log('filtering by username', req.params.user);

    let user = req.params.author;
    db.getEntriesByUser(user).then((entries) => {
        res.render('entries', {
            'title': 'Training Goal Tracker',
            'entries': entries
        });
    }).catch((err) => {
        console.log('error handling author posts', err);
    });
}

exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');

    if (!req.body.author) {
        response.status(400).send("Entries must have an author.");
        return;
    }
    db.addEntry(req.body.author, req.body.subject, req.body.contents);
    res.redirect('/');
}

exports.show_new_entries = function(req, res) {
    res.render('newEntry', {
        'title': 'Training Goal Tracker'
    })
}

exports.delete_entries = function(req, res) {
    db.deleteEntriesByUser();
}

exports.update_entries = function(req, res) {
    db.updateEntriesByUser();
}

exports.server_error = function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
}