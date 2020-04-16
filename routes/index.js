const pushToDB = require('../data/pushToDB');
const mongoose = require("mongoose");


const constructorMethod = (app) => { 
 
    app.get('/', (req, res) => {

        const postMovies = pushToDB.getAllMovies();
        // console.log(postMovies)
        // res.render('home', {style: 'style.css'}, {postMovies});
        res.render('home', {style: 'style.css'});
    });
};  
module.exports = constructorMethod;