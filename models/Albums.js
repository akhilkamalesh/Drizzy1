const mongoose = require('mongoose')


const AlbumSchema = new mongoose.Schema({
    albumNumber:{
        type: Number,
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

    slug: String, // So Far Gone = so-far-gone
});

module.exports = mongoose.model('Album', AlbumSchema);