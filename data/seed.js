
const csv = require('csv-parser')
const fs = require('fs')
const result = []; 

const mongoCollections = require("../config/mongoCollection");

const dbConnection = require("../config/mongoConnection");


var ObjectID = require('mongodb').ObjectID;
const movies = mongoCollections.movies;

const pushToDB = require('./pushToDB')
const users = require('./users')

const main = async() => { 

    try{ 
        // Push Movies into Database 
        fs.createReadStream('moviesSmall.csv')
            .pipe(csv())
            .on('data', (data) => pushToDB.create(data.movieID, data.movieName, data.genre))
            .on('end', () => {console.log("Finished Reading CSV")});

        //Push Users into Database 
        await users.addUser("Chloe", "apple")
    
    }catch(error){
        console.log(error)
    }


    

};

main().catch((err) => { 
    console.log(err);
})