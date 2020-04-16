const mongoCollections = require('../config/mongoCollection');
var ObjectID = require('mongodb').ObjectID;
const movies = mongoCollections.movies;



module.exports = { 
    async getAllMovies(id){ 
        const moviesCollection = await movies(); 
        const moviesAll = await moviesCollection.find({}).toArray();
        // console.log(moviesAll)
        return moviesAll;
    },

    async getMoviebyID(id){
        if (!id){ 
            throw `[ERROR] ${id} not found`
        }
        const moviesCollection = await movies();

        const movieFoundId = await moviesCollection.findOne({_id: id})

        if (movieFoundId === null){
            throw "[ERROR] No movie with that id";
        }

        return movieFoundId;
    },

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
        return 0
    },
}