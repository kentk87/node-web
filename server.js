const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to write log');
        }
    });
    next();
});

app.use((req, res, next) => {
   res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()  
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    //response.send('<h1>Hello Express!</h1>');
    response.send({
        name : 'Andrew',
        likes: ['apple','orange']
    });
});

app.get('/about', (request, response) => {
    //response.send('<h1>About Page!</h1>');    
    response.render('about.hbs', {
        pageTitle: 'About ME Page',
        //currentYear: new Date().getFullYear()

    });
});

app.get('/home', (request, response) => {
    //response.send('<h1>About Page!</h1>');    
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage : 'Welcome to my home page',
        //currentYear: new Date().getFullYear()

    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage : 'Unable to handle request!'
        
    });
});


app.listen(3000, () => {
    console.log('Server started');
});