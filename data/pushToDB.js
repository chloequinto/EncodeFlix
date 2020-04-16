const mongoCollections = require('../config/mongoCollection');
var ObjectID = require('mongodb').ObjectID;
const movies = mongoCollections.movies;

module.exports = { 
    async create(movieID, movieName){
        if (movieID === null || typeof movieID != "string"){
            throw `[ERROR] ${movieID} is null / not string`
        }

        if (movieName === null || typeof movieName != "string"){
            throw `[ERROR] ${movieName} is null/not string`
        }

        const moviesCollection = await movies();

        let newMovie = {
            movieID: movieID, 
            movieName: movieName
        };

        const insertInfo = await moviesCollection.insertOne(newMovie); 

        if (insertInfo.insertedCount === 0){
            throw `[ERROR] ${movieName} could not be added`;
        }
        console.log("Successfully Uploaded Movie to DB")
        return NaN
    }
}