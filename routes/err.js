const express = require("express"); 
const router = express.Router(); 

router.get('/', async(req, res) => {
    if (req.session.user){
        authenticated = "Authenticated User" 
    }
    if (!req.session.user){
        authenticated = "Non-Authenticated User" 
    }
    console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl+ " " + authenticated)
    res.status(403).render('errView/midErr')
})

module.exports = router