var express = require('express');
var path = require('path');
var dotenv = require('dotenv');

const albums = require('./routes/albums');

var connectDB = require('./config/db');

// Load the environment variables
dotenv.config({path: './config/config.env'});

connectDB(); // Connect to the database via the method created in db.js

var app = express(); // setting app to express

// Body Parser
app.use(express.json());

// mount routers
app.use('/albums', albums); // Connects it to the /albums/...
app.use('/songs', albums);

app.use(express.static(path.join(__dirname, 'images'))); // static files for images to render in html


// Get request
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'pages/index.html'), {title: 'Welcome'}); // can only render views
                             // Can set parameters to pass to the view   
});

const server = app.listen(process.env.PORT, console.log('Server is running on port 3000'));

// Handle unhandled promise rejections
process.on('unhandledRejections', (err, promise) => {
    console.log(`Unhandled Rejection: ${err.message}`)
    // Close server and exit process
    server.close(() => process.exit(1))
});