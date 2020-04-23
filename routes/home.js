const pushToDB = require('../data/pushToDB');

const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => { 
    console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl)
    let movies = await pushToDB.getAllMovies();
    res.render('homeView/home', {style: 'style.css', content: movies});

}); 

router.get('/:id', async(req, res) => {
    console.log('ID')
})



module.exports = router;