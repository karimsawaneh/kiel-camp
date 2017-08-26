var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

// starter data
var data = [
    {
        name: 'Elendsreder Cove',
        image: 'https://cdn.pixabay.com/photo/2017/08/07/15/35/travel-2604981__340.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu tortor porttitor, lacinia metus vitae, vehicula justo. Aenean feugiat nibh pellentesque sapien efficitur volutpat. Curabitur et orci non erat vehicula luctus ut quis urna. In aliquam massa eu lorem finibus tristique. Donec dapibus malesuada eros condimentum malesuada. Sed a lacus tortor. Ut mattis lobortis sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam euismod vitae arcu non fringilla. Fusce maximus, odio a laoreet laoreet, magna purus ornare magna, a tincidunt tellus lacus eu arcu. In faucibus ut eros vitae eleifend. Nunc bibendum semper dui vitae ullamcorper. Sed congue dignissim dapibus. In ut arcu quis mi consectetur suscipit vitae ac lorem.'
    },
    {
        name: 'Kieler Forde',
        image: 'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu tortor porttitor, lacinia metus vitae, vehicula justo. Aenean feugiat nibh pellentesque sapien efficitur volutpat. Curabitur et orci non erat vehicula luctus ut quis urna. In aliquam massa eu lorem finibus tristique. Donec dapibus malesuada eros condimentum malesuada. Sed a lacus tortor. Ut mattis lobortis sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam euismod vitae arcu non fringilla. Fusce maximus, odio a laoreet laoreet, magna purus ornare magna, a tincidunt tellus lacus eu arcu. In faucibus ut eros vitae eleifend. Nunc bibendum semper dui vitae ullamcorper. Sed congue dignissim dapibus. In ut arcu quis mi consectetur suscipit vitae ac lorem.'
    },
    {
        name: 'Speckweg Heim',
        image: 'https://cdn.pixabay.com/photo/2017/06/17/03/17/gongga-snow-mountain-2411069__340.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu tortor porttitor, lacinia metus vitae, vehicula justo. Aenean feugiat nibh pellentesque sapien efficitur volutpat. Curabitur et orci non erat vehicula luctus ut quis urna. In aliquam massa eu lorem finibus tristique. Donec dapibus malesuada eros condimentum malesuada. Sed a lacus tortor. Ut mattis lobortis sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam euismod vitae arcu non fringilla. Fusce maximus, odio a laoreet laoreet, magna purus ornare magna, a tincidunt tellus lacus eu arcu. In faucibus ut eros vitae eleifend. Nunc bibendum semper dui vitae ullamcorper. Sed congue dignissim dapibus. In ut arcu quis mi consectetur suscipit vitae ac lorem.'
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