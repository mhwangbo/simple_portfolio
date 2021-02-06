const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./data/users')
const artworks = require('./data/artworks')
const User = require('./models/userModel')
const Artwork = require('./models/artworkModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Artwork.deleteMany()

        const createdUsers = await User.insertMany(users)
        const createdArtwork = await Artwork.insertMany(artworks)

        console.log('Data Imported!')
    } catch (error) {
        console.error(`${error}`)
        process.exit()
    }
}

importData()