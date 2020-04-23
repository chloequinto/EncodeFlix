const mongoCollections = require('../config/mongoCollection');
var ObjectID = require('mongodb').ObjectID;
const users = mongoCollections.users;
const bcrypt = require('bcrypt-nodejs')

module.exports = { 
    async addUser(name, password){ 
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
            hashPassword: await bcrypt.hashSync(password, salt)
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
    }
}