
const express = require("express");
const router = express.Router();

const passport = require('passport'); 
const JsonStrategy = require('passport-json').Strategy;
const bcrypt = require('bcrypt-nodejs')

const usersData = require("../data/users")

// Verify User 
passport.use(new JsonStrategy(
    function(username, password, done){
        // get username 
        usersData.getUserByName(username, function(err, user){
            if(err){
                return done(err)
            }
            if (!user){
                return done(null,  false);
            }
            //compare password to hashed password 
            bcrypt.compare(password, user.hashedPassword, (err, res) =>{
                if (res === true){
                    return done(null, user)
                }else{
                    return done(null, false, {message: "Incorrect passord"})
                }
            })
        })
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });
  
  passport.deserializeUser(function(id, cb) {
    usersData.getUserByName(username).then((user) => {
      if (!user) { return cb("error"); }
      cb(null, user);
    });
  });
  


router.post("/", function (req, res, next){
    passport.authenticate('json', function(err, user, info){
        // Authentication Failed Display Error Msg 
        if (err){
            return next(err); 
        }
        if(!user){
            //TODO 
            console.log("Authentication fail")
        }
        //Authentication Succeeded Redirect to Home Page 
        req.logIn(user, function(err){
            if(err){
                return next(err); 
            }
            res.send({"url":"/home", "user":user});
        });
    })(req, res, next)
})

// Render Login Handlebars 
router.get('/', (req,res) => {
    res.render('login/form')
});


module.exports = router;