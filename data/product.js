const mongoose = require('mongoose'); 

var Schema = mongoose.Schema; 
var schema = new Schema({
    movieID: {type: String, required: true},
    movieName: {type: String, required: true}
})

module.exports = mongoose.model('Product', schema);