const mongoose = require('mongoose')
const Song = require('./Songs');
const slugify = require('slugify');


const AlbumSchema = new mongoose.Schema({
    albumNumber:{
        type: String,
        required: [true, 'Please add an album title'],
        unique: true
    },
    albumTitle: {
        type: String,
        required: [true, 'Please add an album title'],
        unique: true,
        trim: true,
        maxLength: [50, 'Cannot be more than 50 characters']
    },
    AlbumRating: Number,

    slug: String, // So Far Gone = so-far-gone
});

// Create album slug from the name
AlbumSchema.pre('save', function(next) {
    this.slug = slugify(this.albumTitle, {lower:true});
    next();
});

module.exports = mongoose.model('Album', AlbumSchema);