const express = require('express');
const path = require('path');
const app = express();
const public = path.join(__dirname, 'public');
const router = require('./routes/traininggoalRoutes');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const auth = require('./auth/auth'); 

app.use(bodyParser.urlencoded({extended: false}));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.static(public));
app.use('/', router);

app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }));

app.use(passport.session()); 

app.listen(3000, () => {
 console.log('Server started on port 3000. Ctrl^c to quit.');
})

auth.init(app);