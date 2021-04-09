const express = require('express');
const router = express.Router();
const controller = require('../controller/traininggoalController');

router.get("/", controller.landing_page);

router.get('/traininggoals', controller.entries_list);

router.get('/shownewentries', controller.show_new_entries);

router.post('/postnewentry', controller.post_new_entry);

router.post('/delete', controller.delete_entries);

router.post('/update', controller.update_entries);

router.get('/posts/:user', controller.show_user_entries);

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
    res.send('Internal Server Error.');
})

module.exports = router;