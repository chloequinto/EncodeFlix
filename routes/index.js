// const bandRoutes = require('./bands');  
// const albumRoutes = require('./albums')

const constructorMethod = (app) => { 
 
    app.get('/', (req, res) => {
        res.render('home', {style: 'style.css'});
    });
};  
module.exports = constructorMethod;