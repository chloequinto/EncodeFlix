const express = require("express");
const router = express.Router();
const likes = require('../data/addLike')

router.post('/', async (req, res) => { 
    console.log(req.body.movieID)


    await likes.addLikeToMovies(req.body.movieID); 
    console.log("finished")
}); 

module.exports = router;