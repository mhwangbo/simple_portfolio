const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const notFound = require('./middleware/errorMiddleware')
const errorHandler = require('./middleware/errorMiddleware')

const artworkRoutes = require('./routes/artworkRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/artworks', artworkRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))