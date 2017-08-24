var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// bodyparser
app.use(bodyParser.urlencoded({extended: true}));
// setup view engine
app.set('view engine', 'ejs');

// Landing page
app.get('/', function(req, res){
    res.render('landing');
});

// temp
var campgrounds = [
    { name: 'Bootshafen Slope', image: 'https://cdn.pixabay.com/photo/2016/09/05/12/48/camping-1646504__340.jpg' },
    { name: 'Steenbeker Creek', image: 'https://cdn.pixabay.com/photo/2013/09/16/19/15/camp-182951__340.jpg' },
    { name: 'Bahnhoff Stadt', image: 'https://cdn.pixabay.com/photo/2017/07/31/21/16/tent-2561141__340.jpg' }
]

// campgrounds route
app.get('/campgrounds', function(req, res){
    res.render('Campgrounds', {campgrounds: campgrounds});
});

// New campground route
app.post('/campgrounds', function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image:image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

// new form route where we can add campgrounds
app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});

// Express Server
app.listen(3000, function(){
    console.log('Server started on port:3000');
});