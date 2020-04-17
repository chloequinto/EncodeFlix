const pushToDB = require('../data/pushToDB');

const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => { 
    console.log("here")
    let movies = await pushToDB.getAllMovies();
    res.render('home', {style: 'style.css', content: movies});

}); 

router.post('/', async (req, res) => {
    console.log("here")
    let movies = await pushToDB.getAllMovies();
    res.render('home', {style: 'style.css', content: movies});

})

module.exports = router;