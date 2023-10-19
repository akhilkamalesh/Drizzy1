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
        const album = await Albums.findOne({slug: req.params.slug})
        console.log(album.albumNumber);

        const songs = await Songs.find({albumNumber: album.albumNumber})
        console.log(songs)

        if(!album){
            return res.status(400).json({success: false});
        }

        res.status(200).json({sucess: true, data: album}).sendFile(path.join(process.env.ROOT_PATH, `pages/${req.params.id}.html`), {title: 'So Far Gone'}); 

    } catch (error) {
        console.log(error);
        res.status(400).json({success: false});
    }
});


module.exports = router;