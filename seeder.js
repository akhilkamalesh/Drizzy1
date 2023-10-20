const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({path: './config/config.env'});


// Load Models
const Albums = require('./models/Albums');
const Songs = require('./models/Songs');

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const albumsJSON = JSON.parse(fs.readFileSync(`${__dirname}/_data/albums.json`, 'utf-8'));
const songsJSON = JSON.parse(fs.readFileSync(`${__dirname}/_data/songs.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Songs.create(songsJSON);
        await Albums.create(albumsJSON);
        console.log('Data Imported...');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}


// Delete Data from DB
const deleteData = async () => {
    try {
        await Albums.deleteMany();
        await Songs.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

// node seeder -i
if(process.argv[2] == '-i'){
    importData();
}else if(process.argv[2] == '-d'){
    deleteData();
}