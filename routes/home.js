const pushToDB = require('../data/pushToDB');

const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => { 
    console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl)
    let movies = await pushToDB.getAllMovies();
    res.render('homeView/home', {style: 'style.css', content: movies});

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