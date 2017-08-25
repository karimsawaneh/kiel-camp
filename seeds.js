var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

// starter data
var data = [
    {
        name: 'Elendsreder Cove',
        image: 'https://cdn.pixabay.com/photo/2017/08/07/15/35/travel-2604981__340.jpg',
        description: 'bla bla blalalalalalalalalalalalalalalalalal'
    },
    {
        name: 'Kieler Forde',
        image: 'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg',
        description: 'Scener beyond magical. Best place to die on earth.'
    },
    {
        name: 'Speckweg Heim',
        image: 'https://cdn.pixabay.com/photo/2017/06/17/03/17/gongga-snow-mountain-2411069__340.jpg',
        description: 'If this is not on your bucket list you must be mental'
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('removed campgrounds!');
        }
    });
    // add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err) {
                console.log(err);
            } else {
                console.log('Added a campground');
            // create a comment
            Comment.create({
                text: 'This place is great, but I wish there was Internet',
                author: 'Homer'
            }, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    console.log('Created new comment');
                }
            });
            }
        });
    });
}

module.exports = seedDB;