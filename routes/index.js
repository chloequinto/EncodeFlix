const pushToDB = require('../data/pushToDB');

const loginRoutes = require('./login')
const homeRoutes = require('./home')
const errRoutes = require('./err')
const logoutRoutes = require('./logout')
const likeRoutes = require("./like")

const constructorMethod = (app) => { 
    app.use('/login', loginRoutes)
    app.use('/home', homeRoutes)
    app.use('/errPage', errRoutes)
    app.use('/logout', logoutRoutes)
    app.use("/like", likeRoutes)

    app.get('/home', function(req, res) {
        console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl)
        res.redirect('home');
    });

    app.get('/', (req, res) => {
        console.log(new Date().toUTCString() + ": " + req.method + " " + req.originalUrl)
        res.redirect('login')
    })
    
    app.use("*", (req, res) => { 
        res.sendStatus(404)
    })




};  
module.exports = constructorMethod;