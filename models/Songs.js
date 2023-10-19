const mongoose = require('mongoose')


const SongSchema = new mongoose.Schema({
    songNumber: {
        type: Number,
        unique: true,
        min: [1, 'Rating must be greater than 0'],
    },

    songTitle: {
        type: String,
        required: [true, 'Please add a song title'],
        unique: true,
        trim: true,
        maxLength: [50, 'Cannot be more than 50 characters']
    },

    slug: String, // So Far Gone = so-far-gone
    albumNumber: {
        type: Number,
        min: [1, 'Rating must be greater than 0'],
        max: [15, 'Rating must be less than 15']
    },

    rating: {
        type: Number,
        min: [1, 'Rating must be greater than 0'],
        max: [10, 'Rating must be less tha 10']
    }

});

module.exports = mongoose.model('Song', SongSchema);