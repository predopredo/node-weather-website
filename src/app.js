//core modules
const path = require('path')
//npm modules
const express = require('express');
const hbs = require('hbs');
//app modules
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();

//define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirPath));

const name = 'Pedro Santos'

//home
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    });
});

//about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name
    });
});

//help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This is some helpful text. Hope it helped',
        name
    });
});

//weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please insert a location'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: weatherData,
                location,
                address: req.query.address
            });
        });
    });

});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

// help 404
app.get('/help/*', (req, res) => {
    res.render('404help', {
        title: 404,
        name
    })
})

//overall 404
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name
    })
});

//listen
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});