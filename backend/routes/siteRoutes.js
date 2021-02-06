const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const admin = require('../middleware/authMiddleware')
const { getSites, updateSite } = require('../controllers/siteController')

router.route('/').get(getSites)
router.route('/:id').put(protect, admin, updateSite)

module.exports = router