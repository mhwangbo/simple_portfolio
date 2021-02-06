const asyncHandler = require('express-async-handler')
const Site = require('../models/siteModel')

// @desc    Fetch all sites
// @route   GET /api/site
// @desc    Public
const getSites = asyncHandler(async (req, res) => {
    const sites = await Site.find({})
    res.json(sites)
})


// @desc    Update a single artwork
// @route   PUT /api/site/:id
// @desc    Private/Admin
const updateSite = asyncHandler(async (req, res) => {
    const { name, detail, description, keywords, logo } = req.body

    const site = await Site.findById(req.params.id)

    if (site) {
        site.name = name
        site.detail = detail
        site.description = description
        site.keywords = keywords
        site.log = logo

        const updatedSite = await site.save()
        res.json(updatedSite)
    } else {
        res.status(404)
        throw new Error('Site not found')
    }
})

module.exports = { getSites, updateSite }
