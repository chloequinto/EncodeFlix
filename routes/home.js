const pushToDB = require('../data/pushToDB');
const users = require('../data/users')

const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => { 
    console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl)
    //get req.session.user_id
    // if hasModel == 1 
    console.log(req.session.user.id)
    let movies = await users.checkModelRecc(req.session.user.id); 
    // let movies = await pushToDB.getAllMovies();
    res.render('homeView/home', {style: 'style.css', content: movies});

}); 

router.get('/:id', async(req, res) => {
    console.log('ID')
})



module.exports = router;