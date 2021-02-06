const express = require('express')
const router = express.Router()
const authUser = require('../controllers/userController')
const admin = require('../middleware/authMiddleware')

router.post('/login', authUser)

module.exports = router