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

// @desc    Delete a single artwork
// @route   DELETE /api/artworks/:id
// @desc    Private/Admin
const deleteArtwork = asyncHandler(async (req, res) => {
    const artwork = await Artwork.findById(req.params.id)

    if (artwork) {
        await artwork.remove()
        res.json({ message: 'Artwork removed' })
    } else {
        res.status(404)
        throw new Error('Artwork not found')
    }
})

// @desc    Create a single artwork
// @route   POST /api/artworks
// @desc    Private/Admin
const createArtwork = asyncHandler(async (req, res) => {
    const { name, image } = req.body

    const artwork = await Artwork.create({
        name,
        image
    })

    if (artwork) {
        res.status(201).json({
            _id: artwork._id,
            name: artwork.name,
            image: artwork.image
        })
    } else {
        res.status(400)
        throw new Error('Invalid artwork data')
    }

    // const createdArtwork = await artwork.save()
    // res.status(201).json(createdArtwork)
})

// @desc    Update a single artwork
// @route   PUT /api/artworks/:id
// @desc    Private/Admin
const updateArtwork = asyncHandler(async (req, res) => {
    const { name, image } = req.body

    const artwork = await Artwork.findById(req.params.id)

    if (artwork) {
        artwork.name = name
        artwork.image = image

        const updatedArtwork = await artwork.save()
        res.json(updatedArtwork)
    } else {
        res.status(404)
        throw new Error('Artwork not found')
    }
})

module.exports = { getArtworks, getArtworkById, deleteArtwork, createArtwork, updateArtwork }