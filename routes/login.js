
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
            console.log("Passport Verify")
            if(err){
                console.log("error")
                return done(err)
            }
            if (!user){
                console.log("no user")
                return done(null,  false);
            }
            //compare password to hashed password 
            bcrypt.compare(password, user.hashPassword, (err, res) =>{
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
    console.log("LOGIN POST")
    passport.authenticate('json', function(err, user, info){
        // Authentication Failed Display Error Msg 
        if (err){
            return next(err); 
        }
        if(!user){
            //TODO 
            console.log("Authentication Fail")
        }
        //Authentication Succeeded Redirect to Home Page 
        req.logIn(user, function(err){
            if(err){
                return next(err); 
            }
            console.log("SENDING TO HOME")
            // res.redirect("home");
            // console.log(res.send({"url":"/home", "user":user}))
            // res.send({"url": "/rolecheck", "user": user});
            res.render('home')
        });
    })(req, res, next);
});

// Render Login Handlebars 
router.get('/', (req,res) => {
    res.render('login/form')
});


module.exports = router;