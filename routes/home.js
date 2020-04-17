const pushToDB = require('../data/pushToDB');

const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => { 
    let movies = await pushToDB.getAllMovies();
    res.render('home', {style: 'style.css', content: movies});

}) 

module.exports = router;