const express = require("express"); 
const router = express.Router(); 


router.get("/", async(req, res) => { 
    console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl)
    req.session.destroy(function(err){ 
        if (err){ 
            console.log(err); 
        }else{ 
            res.render('logoutView/logout');
        }
    }); 
})


module.exports = router; 