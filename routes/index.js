const pushToDB = require('../data/pushToDB');
const mongoose = require("mongoose");
const Content = require('../model/content')


const constructorMethod = (app) => { 
 
    app.get('/', async (req, res) => {

        let movies = await pushToDB.getAllMovies();
        console.log(movies)
        res.render('home', {style: 'style.css', content: movies});


    });


    // app.get('/', (req, res, next)=> { 
    //     Content.find(function(err, content){
    //         res.render('home', {style: 'style.css', movies:content});
    //         console.log(content)
            
    //     })
    // })
};  
module.exports = constructorMethod;