
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
                    console.log("Incorrect Password")
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

    loginData = req.body; 
    let errors = [];
    console.log(req.body)
    if (!loginData.username){
        console.log("No username provided")
        errors.push("No username provided"); 
    }

    if (!loginData.password){ 
        console.log("No password provided")
        errors.push("No password provided")
    }

    if (errors.length > 0){ 
        console.log(errors)
        return res.render('login/form', {message: errors})
    }

    passport.authenticate('json', function(err, user, info){
        if (err){
            return next(err); 
        }
        if(!user){
            return res.render('login/form', {message: "Invalid User"})
        }

        req.logIn(user, function(err){
            if(err){
                return next(err); 
            }

            req.session.user = {id: user._id, user: user.username}
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