var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');

var app = express();

// connect mongoose
mongoose.connect('mongodb://localhost/kiel_camp', ({
    useMongoClient: true
}));
mongoose.Promise = global.Promise;
// bodyparser
app.use(bodyParser.urlencoded({extended: true}));
// setup view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// using seedDB
seedDB();

// Landing page
app.get('/', function(req, res){
    res.render('landing');
}); 

// INDEX route - show all campgrounds
app.get('/campgrounds', function(req, res){
    //Get all campgrounds from the db
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });
});

// CREATE route - add new campground to DB
app.post('/campgrounds', function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image:image, description: desc};
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

// NEW route - show form where we can create campgrounds
app.get('/campgrounds/new', function(req, res){
    res.render('campgrounds/new');
});

// SHOW route - shows info about a particular campground
app.get('/campgrounds/:id', function(req, res){
    // find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            // render show template with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// ==========================
//     COMMENTS ROUTES
// ==========================

// Create comment - this shows the form to input comment
app.get('/campgrounds/:id/comments/new', function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// Post comment - this will submit the comment to a campground
app.post('/campgrounds/:id/comments', function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect campground showpage
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// Express Server
app.listen(3000, function(){
    console.log('Server started on port:3000');
});