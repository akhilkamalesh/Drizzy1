const express = require('express');
const path = require('path');
const router = express.Router();
const dontenv = require('dotenv');
const Albums = require('../models/Albums');
const Songs = require('../models/Songs')

// Get request for songs
router.get('/rankedsongs', async function(req, res, next){
    try {
        const songs = await Songs.find().sort({rating: 1});
        res.status(200).json({success: true, data: songs}).sendFile(path.join(process.env.ROOT_PATH,'pages/rankedsongs.html'), {title: 'Welcome'}); // can only render views
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false});
    }
});


module.exports = router;