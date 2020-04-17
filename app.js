const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');


const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
// app.use(bodyParser.json)

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json()); //figure out if this is needed 
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


configRoutes(app);

passport.use(new Strategy(
	function(username, password, done) {
	  users.findByUsername(username).then((user) => {
		bcrypt.compare(password, user.hashedPassword, (err, res) => {
		  if (res === true) {
			return done(null, user);
		  } else {
			return done(null, false);
		  }
		});
	  }).catch(function() {
		  return done(null, false); 
	  });
  }));
  
passport.serializeUser(function(user, cb) {
	console.log("Serializing user");
	console.log(user._id) // err here 
	cb(null, user._id);
});
  
passport.deserializeUser(function(id, cb) {
users.findById(id).then((user) => {
	if (!user) { return cb('error'); }
	cb(null, user);
});
});
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'donttellme', resave: false, saveUninitialized: false }));



app.listen(3000, () => {
	console.log('Server up. Routes running on http://localhost:3000');
});