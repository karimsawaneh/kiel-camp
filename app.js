var express = require('express');

var app = express();

// setup view engine
app.set('view engine', 'ejs');

// Landing page
app.get('/', function(req, res){
    res.render('landing');
});

// campgrounds route
app.get('/campgrounds', function(req, res){
    var campgrounds = [
        { name: 'Bootshafen Slope', image: 'https://cdn.pixabay.com/photo/2016/09/05/12/48/camping-1646504__340.jpg'},
        { name: 'Steenbeker Creek', image: 'https://cdn.pixabay.com/photo/2013/09/16/19/15/camp-182951__340.jpg'},
        { name: 'Bahnhoff Stadt', image: 'https://cdn.pixabay.com/photo/2017/07/31/21/16/tent-2561141__340.jpg'}
    ]

    res.render('Campgrounds', {campgrounds: campgrounds});
});

// Express Server
app.listen(3000, function(){
    console.log('Server started on port:3000');
});