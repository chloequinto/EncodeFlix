const mongoCollections = require('../config/mongoCollection');
var ObjectID = require('mongodb').ObjectID;
const users = mongoCollections.users;
const movies = mongoCollections.movies;
const bcrypt = require('bcrypt-nodejs')

module.exports = { 
    async addUser(name, password, hasModel, hasRecc){ 
        if(typeof name !== "string" || name === null){
            throw "[ERROR] No name provided or not string"
        }
        if(typeof password !== "string" || password == null){
            throw "[ERROR] No password provided"
        }

        const usersCollection = await users(); 

        var salt = bcrypt.genSaltSync(10);

        let newUser = { 
            username: name, 
            hashPassword: await bcrypt.hashSync(password, salt), 
            hasModel: hasModel, 
            hasRecc: hasRecc
        }

        const insertInfo = await usersCollection.insertOne(newUser); 

        if (insertInfo.insertedCount === 0){ 
            throw `[ERROR] ${name} could not be added`
        }

        console.log("Successfully Uploaded User to DB")
    }, 

    async getUserByName(name, cb){
        if (typeof name !== "string" || name == null){
            throw "[ERROR] No name provided or not string"
        }

        const usersCollection = await users(); 
        let currUser = await usersCollection.findOne({username: name});

        if (!currUser){
            throw `[ERROR] ${name} not in database`
        }

        cb(null, currUser) //callback 
        return currUser

    }, 

    async getUserById(id){
        if (typeof id !== "stirng"){ 
            throw "[ERROR] id is null"
        }

        const usersCollection = await users(); 
        const currUser = await usersCollection.findOne({_id: id}); 
        if (!currUser){ 
            throw `[ERROR] ${id} not found`
        }

        return currUser
    }, 
    async updateModelRecc(id, recc){ 
        console.log("here")
        if(!id){
            throw "[ERROR] No ID Provided"
        }
        if(!recc){
            throw "[ERROR] No Reccomendation Provided"
        }
        const usersCollection = await users(); 
        const updatedInfo = await usersCollection.updateOne(
            { "_id": new ObjectID(id)}, 
            {$set: {"hasModel": 1, 
                    "hasRecc": recc}}
        )

        if (updatedInfo.modifiedCount === 0){ 
            throw "[ERROR] Could not update user sucessfully"
        }

        const foundUser = await usersCollection.findOne({ "_id": new ObjectID(id)});
        return foundUser

    }, 

    async checkModelRecc(id){ 
        if (!id) { 
            throw "[ERROR] No ID provided "
        }

        const usersCollection = await users(); 

        const foundUser = await usersCollection.findOne({ "_id": new ObjectID(id)});
        if (!foundUser){ 
            throw `[ERROR] ${id} not found`
        }

        movieIDs = []
        recc = JSON.parse(foundUser.hasRecc)

        const moviesCollection = await movies(); 
        if(foundUser.hasModel === 1){
            for (x in recc){
                // movieIDs.push(recc[x][0])
                let currMovie = await moviesCollection.findOne({movieID: recc[x][0].toString()});
                // console.log(currMovie)
                movieIDs.push(currMovie._id)
            }
            // console.log(movieIDs)
            // var movieObj = movieIDs.map(function(id) { return new ObjectID(id); });
            // ids = 
            const moviesRecc  = await moviesCollection.find({ 
                "_id": {
                    $in: [new ObjectID("5ea25049a82624327e520801"), new ObjectID("5ea25049a82624327e520803")]
                }
            });
            // console.log(moviesRecc)
            return moviesRecc

        }else {
            let movies = await pushToDB.getAllMovies();
            console.log("User has no model recommendation")
            return movies 
        }

        
    }
}