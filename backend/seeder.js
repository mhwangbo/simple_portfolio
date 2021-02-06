const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./data/users')
const artworks = require('./data/artworks')
const sites = require('./data/sites')
const User = require('./models/userModel')
const Artwork = require('./models/artworkModel')
const Site = require('./models/siteModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Artwork.deleteMany()
        await Site.deleteMany()

        const createdUsers = await User.insertMany(users)
        const createdArtwork = await Artwork.insertMany(artworks)
        const createdSite = await Site.insertMany(sites)

        console.log('Data Imported!')
    } catch (error) {
        console.error(`${error}`)
        process.exit()
    }
}

importData()