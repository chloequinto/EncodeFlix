var Content = require("../model/content")
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/movieMarketplace', {
	useNewUrlParser: true,
	useUnifiedTopology: true})

var content = [
    new Content({
        movieID: '1',
        movieName: "Toy Story"
    }),     
    new Content({
        movieID: '2', 
        movieName: 'Jumanji'
    }),
    new Content({
        movieID: "3", 
        movieName: "Grumpier Old Men"
    })
]

var done = 0; 
for (var i = 0; i < content.length; i++){ 
    content[i].save(function(err, result){
        done++; 
        if (done === content.length){
            console.log("done")
        }
    });
}
mongoose.disconnect();
