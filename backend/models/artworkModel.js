const mongoose = require('mongoose')

const artworkSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Artwork = mongoose.model('Artwork', artworkSchema)

module.exports = Artwork