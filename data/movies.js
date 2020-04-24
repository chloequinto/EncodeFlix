const mongoCollections = require('../config/mongoCollection');
var ObjectID = require('mongodb').ObjectID;
const movies = mongoCollections.movies;



module.exports = { 
    async getAllMovies(){ 
        const moviesCollection = await movies(); 
        // const moviesAll = await moviesCollection.find({}).toArray();
        const moviesRandom = await moviesCollection.aggregate([{ $sample: { size: 6 } }]).toArray(); 
        // console.log(moviesRandom)
        return moviesRandom;
    },

    async getMoviebyID(id){
        if (!id){ 
            throw "[ERROR] id not found"
        }
        const moviesCollection = await movies();

        const movieFoundId = await moviesCollection.findOne({_id: id})

        if (movieFoundId === null){
            throw "[ERROR] No movie with that id";
        }

        return movieFoundId;
    },

    async create(movieID, movieName, genre){
        if (movieID === null || typeof movieID != "string"){
            throw `[ERROR] movieIDis null / not string`
        }

        if (movieName === null || typeof movieName != "string"){
            throw `[ERROR] movieName is null/not string`
        }
        if (genre === null || typeof genre != "string"){
            throw `[ERROR] genre is null/not string`
        }
        const moviesCollection = await movies();

        let newMovie = {
            movieID: movieID, 
            movieName: movieName,
            genre: genre, 
            numLikes: 0
        };

        const insertInfo = await moviesCollection.insertOne(newMovie); 

        if (insertInfo.insertedCount === 0){
            throw `[ERROR] ${movieName} could not be added`;
        }
        console.log("Successfully Uploaded Movie to DB")
        return 0
    },
}