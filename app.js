var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds');

var app = express();

// requiring routes
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

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
// seedDB(); seeding the db

// Passport config
app.use(require('express-session')({
    secret: 'Anna is still the best',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// comment auth middleware to show user
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// Express Server
app.listen(3000, function(){
    console.log('Server started on port:3000');
});