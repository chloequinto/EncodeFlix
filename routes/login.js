
const express = require("express");
const router = express.Router();

const passport = require('passport'); 
const JsonStrategy = require('passport-json').Strategy;
const bcrypt = require('bcrypt-nodejs')

const usersData = require("../data/users")

passport.use(new JsonStrategy(
    function(username, password, done){
        usersData.getUserByName(username, function(err, user){
            if(err){
                console.log("error")
                return done(err)
            }
            if (!user){
                console.log("no user")
                return done(null,  false);
            }
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
    console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl)
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
            req.session.user = {id: user._id, user: user.username}
            console.log(req.session.user)
            res.send({"url": "/home", "user": user});

        });
    })(req, res, next);
});


router.get('/', (req,res) => {
    res.render('login/form')
});



router.post('/logout', async(req, res) => { 
    if (req.session.user){
        authenticated = "Authenticated User" 
    }
    if (!req.session.user){
        authenticated = "Non-Authenticated User" 
    }
    console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl+ " " + authenticated)
    req.session.destroy(function(err){ 
        if (err){ 
            console.log(err); 
        }else{ 
            res.redirect('/logout');
        }
    }); 

    
})


module.exports = router;