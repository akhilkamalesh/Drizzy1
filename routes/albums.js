const express = require('express');
const path = require('path');
const router = express.Router();
const dontenv = require('dotenv');
const Albums = require('../models/Albums');
const Songs = require('../models/Songs')

// Get request for ranked albums (Sorts albums based on rating)
router.get('/rankedalbums', async function(req, res, next){
    try {
        const albums = await Albums.find().sort({albumNumber: 1});
        res.status(200).json({success: true, data: albums}).sendFile(path.join(process.env.ROOT_PATH,'pages/rankedalbums.html'), {title: 'Welcome'}); // can only render views
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false});
    }
});

// Grabs the html page based on the title passed in
// Grabs the album and the songs for the albums
router.get('/:slug', async function(req, res, next){
    try {
        const album = await Albums.findOne({slug: req.params.slug}) // Grabs the album

        // If it doesn't exist, return false
        if(!album){
            return res.status(400).json({success: false});
        }

        // Grabs the songs from the album
        const songs = await Songs.find({albumNumber: album.albumNumber})

        // Creates the rating for the album
        var albumRating = 0;
        for(var song in songs){
            if(songs.hasOwnProperty(song)){
                albumRating = albumRating + songs[song].rating;
                // console.log(songs[song]);
            }
        }        
        albumRating = albumRating / Object.keys(songs).length;
        album.rating = albumRating.toFixed(2);
        console.log(album.rating);

        res.status(200).json({sucess: true, album: album, albumRating: album.rating, song: songs}).sendFile(path.join(process.env.ROOT_PATH, `pages/${req.params.slug}.html`), {title: 'So Far Gone'}); 

    } catch (error) {
        console.log(error);
        res.status(400).json({success: false});
    }
});


module.exports = router;