var express = require('express');
var path = require('path');

var app = express(); // setting app to express

app.use(express.static(path.join(__dirname, 'images'))); // static files for images to render in html


// Get request
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'pages/index.html'), {title: 'Welcome'}); // can only render views
                             // Can set parameters to pass to the view   
});

// Get request
app.get('/rankedalbums', function(req, res){
    res.sendFile(path.join(__dirname,'pages/rankedalbums.html'), {title: 'Welcome'}); // can only render views
                             // Can set parameters to pass to the view   
});

// Get request
app.get('/sofargone', function(req, res){
    res.sendFile(path.join(__dirname,'pages/sofargone.html'), {title: 'Welcome'}); // can only render views
                             // Can set parameters to pass to the view   
});

app.listen(3000);
console.log('Server is running on port 3000')
