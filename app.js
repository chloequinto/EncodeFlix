const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/movieMarketplace', {
	useNewUrlParser: true,
	useUnifiedTopology: true})

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



configRoutes(app);

app.listen(3000, () => {
	console.log('Server up. Routes running on http://localhost:3000');
});