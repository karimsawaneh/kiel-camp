var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// connect mongoose
mongoose.connect('mongodb://localhost/kiel_camp', ({
    useMongoClient: true
}));
// bodyparser
app.use(bodyParser.urlencoded({extended: true}));
// setup view engine
app.set('view engine', 'ejs');

// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});
var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     { 
//         name: 'Steenbeker Creek', 
//         image: 'https://cdn.pixabay.com/photo/2013/09/16/19/15/camp-182951__340.jpg' 
//     },   function(err, campground){
//          if(err){
//         console.log(err);
//     } else {
//         console.log('NEWLY CREATED CAMPGROUND: ');
//         console.log(campground);
//     }
// });

// Landing page
app.get('/', function(req, res){
    res.render('landing');
}); 

// campgrounds route
app.get('/campgrounds', function(req, res){
    //Get all campgrounds from the db
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('Campgrounds', {campgrounds: allCampgrounds});
        }
    });
});

// New campground route
app.post('/campgrounds', function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image:image};
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

// new form route where we can add campgrounds
app.get('/campgrounds/new', function(req, res){
    res.render('new.ejs');
});

// Express Server
app.listen(3000, function(){
    console.log('Server started on port:3000');
});