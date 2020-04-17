const dbConnection = require('../config/mongoConnection')
const users = require('./users')

const main = async() => {
    
    try { 

        var name = await users.addUser("Chloe", "apple")

    }catch(error){ 
        throw error
    }

}

main().catch((err) => { 
    console.log(err)
})