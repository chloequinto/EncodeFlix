const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');


const app = express();
const session = require('express-session');
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);

app.use(passport.initialize())
app.use(passport.session())

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json()); //figure out if this is needed 
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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
	cb(null, user._id);
});
  
passport.deserializeUser(function(id, cb) {
	users.findById(id).then((user) => {
		if (!user) { return cb('error'); }
		cb(null, user);
	});
});

app.use(
    session({
        name:"AuthCookie",
        secret: "it's a secret",
        saveUninitialized: true, 
        resave: false
    })
); 


app.use("/home", (req, res, next) => {
	if (!req.session.user){
		console.log("Not Logged In")
		return res.redirect('/errPage')
	}else{
		next(); 
	}
})



configRoutes(app);


app.listen(3000, () => {
	console.log('Server up. Routes running on http://localhost:3000');
});