const pushToDB = require('../data/pushToDB');

const loginRoutes = require('./login')
const homeRoutes = require('./home')

const constructorMethod = (app) => { 
    app.use('/login', loginRoutes)
    app.use('/home', homeRoutes)

    // redirect to login 
    app.get('/', (req, res) => {
        res.redirect('login')
    })
    
    app.use("*", (req, res) => { 
        res.sendStatus(404)
    })

    // app.get('/', async (req, res) => {
    //     let movies = await pushToDB.getAllMovies();
    //     res.render('home', {style: 'style.css', content: movies});
    // });



};  
module.exports = constructorMethod;