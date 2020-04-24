const express = require("express");
const router = express.Router();
const likes = require('../data/addLike')

router.post('/', async (req, res) => { 
    await likes.addLikeToMovies(req.body.movieID); 
}); 

module.exports = router;