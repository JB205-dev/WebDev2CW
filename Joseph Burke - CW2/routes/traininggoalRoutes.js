const express = require('express');
const router = express.Router();
const controller = require('../controller/traininggoalController');

router.get("/", controller.landing_page);

// router.get('/traininggoals', controller.entries_list);

// router.get('/createnewentries', controller.show_new_entries);

// router.get('/postnewentry', controller.show_new_entry);

// router.post('/postnewentry', controller.post_new_entry);

router.post('/delete', controller.delete_entries);

router.post('/update', controller.update_entries);

router.get('/posts/:user', controller.show_user_entries);

router.get('/register', controller.show_register_page);

router.post('/register', controller.post_new_user);

router.get('/login', controller.show_login_page);

router.post("/login", auth.authorize("/login"), controller.post_login);

router.get("/logout", controller.logout);

router.get('/postnewentry', ensureLoggedIn('/login'), controller.show_new_entries);

router.post('/postnewentry', ensureLoggedIn('/login'), controller.post_new_entry); 

router.get('/about', function(req, res) {
    res.redirect('/about.html');
})

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Errors.');
})

module.exports = router;