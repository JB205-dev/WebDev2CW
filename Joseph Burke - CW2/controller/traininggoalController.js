const auth = require('../auth/auth.js');
const {ensureLoggedIn} = require('connect-ensure-login'); 
const userDao = require('../model/userModel.js');
const trainingGoalDAO = require('../model/traininggoalModel');
const db = new trainingGoalDAO();
db.init();

// exports.entries_list = function(req, res) {
//     // res.send('<h1>Not yet implemented: show a list of guest book entries.</h1>');
//     db.getAllEntries();
// }

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

// exports.post_new_entry = function(req, res) {
//     console.log('processing post-new_entry controller');
//     // if (!req.goal) {
//     //     response.status(400).send("Entries must have an author.");
//     //     return;
//     // }
//     db.addEntry(req.user, req.date, req.goal, req.goalBreakdown, req.achievements);
//     console.log('Entry complete.');
//     res.redirect('/');
// }

exports.post_new_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.user) {
    response.status(400).send("Entries must have an author.");
    return;
    }
    db.addEntry(req.user, req.date, req.goal, req.goalBreakdown, req.achievements);
    res.redirect('/');
   } 

exports.show_new_entries = function(req, res) {
    res.render('newEntry', {
        'title': 'Training Goal Tracker'
    });
}

exports.delete_entries = function(req, res) {
    db.deleteEntriesByUser();
}

exports.update_entries = function(req, res) {
    db.updateEntriesByUser();
}

exports.show_register_page = function(req, res) {
    res.render("user/register");
}

exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    //console.log("register user", user, "password", password);
        if (!user || !password) {
            res.send(401, 'no user or no password');
            return;
        }
        userDao.lookup(user, function(err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
            userDao.create(user, password);
            res.redirect('/login');
        });
};

exports.show_login_page = function(req, res) {
    res.render("user/login");
};

exports.authorize = function(redirect) {
    return passport.authenticate('local', { failureRedirect: redirect});
};

exports.post_login = function(req, res) {
    response.redirect("/");
};

exports.show_user_entries = function(req, res) {
    let user = req.params.author;
        db.getEntriesByUser(user)
        .then((entries) => {
            res.render('entries', {
                'title': 'Training Goal Tracker',
                'entries': entries
            });
        })
        .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
    });
}

exports.show_new_entries = function(req, res) {
    res.render('entries', {
        'title': 'Training Goal Tracker',
        'entries': entries
    });
}

exports.logout = function(req, res) {
    req.logout();
    res.redirect("/");
   };

exports.server_error = function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
}