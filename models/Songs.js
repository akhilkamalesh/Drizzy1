const mongoose = require('mongoose')
const slugify = require('slugify');


const SongSchema = new mongoose.Schema({
    songNumber: {
        type: String,
        unique: true    
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
        type: String,
        ref: 'Album',
        required: true
    },

    rating: {
        type: Number,
        min: [1, 'Rating must be greater than 0'],
        max: [10, 'Rating must be less than 10']
    }

});


// Create album slug from the name
SongSchema.pre('save', function(next) {
    this.slug = slugify(this.songTitle, {lower:true});
    next();
});

module.exports = mongoose.model('Song', SongSchema);