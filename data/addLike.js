const mongoCollections = require('../config/mongoCollection');
var ObjectID = require('mongodb').ObjectID;
const movies = mongoCollections.movies;



module.exports = { 
    async addLikeToMovies(id){ 
        console.log("addLikeToMovies")
        if (!id){ 
            throw "[ERROR] id not found"
        }

        const moviesCollection = await movies(); 
        const movieFoundId = await moviesCollection.findOne({movieID: id})

        if (movieFoundId === null){
            throw "[ERROR] No movie with that id";
        }
        console.log(movieFoundId)
        const updateInfo = await moviesCollection.updateOne(
            {"_id": new ObjectID(movieFoundId._id)}, 
            {$inc:{
                numLikes: 1
                }
            }
        )
    
        if (updateInfo.modifiedCount === 0){ 
            throw "[ERROR] Could not update movie"
        }
        
        console.log("Updated Movie Number of Likes")


    }
}