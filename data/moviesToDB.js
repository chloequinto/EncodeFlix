const csv = require('csv-parser')
const fs = require('fs')
const result = []; 

const mongoCollections = require("../config/mongoCollection");
var ObjectID = require('mongodb').ObjectID;
const movies = mongoCollections.movies;

const pushToDB = require('../data/pushToDB')

const main = async() => { 


    console.log("========================================="); 
    console.log("Parsing movies.csv")

    // Read CSV file and call JS file to push to database 
    fs.createReadStream('moviesSmall.csv')
        .pipe(csv())
        .on('data', (data) => pushToDB.create(data.movieID, data.movieName))
        .on('end', () => {
            console.log("Finished Reading CSV")

        });


}

main().catch((err) => { 
    console.log(err);
})