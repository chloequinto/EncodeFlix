const express = require("express"); 
const router = express.Router(); 
const path = require('path');
const likes = require("../data/addLike")


router.get("/", async(req, res) => { 
    console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl)
    req.session.destroy(function(err){ 
        if (err){ 
            console.log(err); 
        }else{ 
            res.render('logoutView/logout');
            
        }
    }); 

    // spawn model.py 

    const recc = await likes.getLikes(); 
    
    console.log("Your Likes " + recc)

    var spawn = require('child_process').spawn; 
    let proc = spawn("python3", ["model/model.py", recc])

    var result = ""

    proc.stdout.on('data', function(data) { 
        console.log(data.toString())
        result += data.toString(); 
    }); 



    proc.stderr.on('data', (data) => {
        console.error(`Warnings:\n${data}`);
    });

    proc.stdout.on('end', async function(code){
        console.log("result: " + result)
    })



})


module.exports = router; 