const express = require('express')
const router = express.Router()
const getArtworkById = require('../controllers/artworkController')
const getArtworks = require('../controllers/artworkController')

router.route('/').get(getArtworks)
router.route('/:id').get(getArtworkById)

module.exports = router