const mongoCollections = require('../config/mongoCollection');
var ObjectID = require('mongodb').ObjectID;
const movies = mongoCollections.movies;



module.exports = { 
    async addLikeToMovies(id){ 
        if (!id){ 
            throw "[ERROR] id not found"
        }

        const moviesCollection = await movies(); 
        const movieFoundId = await moviesCollection.findOne({movieID: id})

        if (movieFoundId === null){
            throw "[ERROR] No movie with that id";
        }

        const updateInfo = await moviesCollection.updateOne(
            {"_id": new ObjectID(movieFoundId._id)}, 
            {$inc: {numLikes: 1}
            }
        )
        
        if (updateInfo.modifiedCount === 0){ 
            throw "[ERROR] Could not update movie"
        }
        
        const updatedMovieInfo = await moviesCollection.findOne({movieID: id})

        console.log(updatedMovieInfo);
        console.log("Updated Movie Number of Likes");
    }, 

    async getLikes(){
        const moviesCollection = await movies(); 
        const getMovie = await moviesCollection.find({}).toArray()
        allMovieRecc = []
        // console.log(getMovie)
        for (x in getMovie){ 
            // console.log(getMovie.movieID)
            var currMovie = (getMovie[x].movieID, getMovie[x].numLikes)
            allMovieRecc.push(currMovie)
        }

        // console.log(allMovieRecc)
        return allMovieRecc
    }
}