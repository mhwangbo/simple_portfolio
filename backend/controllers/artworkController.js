const asyncHandler = require('express-async-handler')
const Artwork = require('../models/artworkModel')

// @desc    Fetch all artworks
// @route   GET /api/artworks
// @desc    Public
const getArtworks = asyncHandler(async (req, res) => {
    const artworks = await Artwork.find({})
    res.json(artworks)
})

// @desc    Fetch a single artwork
// @route   GET /api/artworks/:id
// @desc    Public
const getArtworkById = asyncHandler(async (req, res) => {
    const artwork = await Artwork.findById(req.params.id)
    if (artwork) {
        res.json(artwork)
    } else {
        res.status(404)
        throw new Error('Artwork not found')
    }
})

module.exports = getArtworks, getArtworkById