const express = require('express');
const path = require('path');
const router = express.Router();
const dontenv = require('dotenv');
const Albums = require('../models/Albums');

// Get request for ranked albums (Sorts albums based on rating)
router.get('/rankedalbums', async function(req, res, next){
    try {
        const albums = await albums.find();
        res.status(200).json({success: true, data: bootcamps}).sendFile(path.join(process.env.ROOT_PATH,'pages/rankedalbums.html'), {title: 'Welcome'}); // can only render views
    } catch (error) {
        res.status(400).json({success: false});
    }
});

// Grabs the html page based on the title passed in
// Grabs the album and the songs for the albums
router.get('/:id', async function(req, res, next){
    try {
        const album = await albums.findById(req.params.id)

        if(!album){
            return res.status(400).json({success: false});
        }

        res.status(200).json({sucess: true, data: album}).sendFile(path.join(process.env.ROOT_PATH, `pages/${req.params.id}.html`), {title: 'So Far Gone'}); 

    } catch (error) {
        res.status(400).json({success: false});
    }
});


module.exports = router;