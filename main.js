require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT ?? 5000
const app = express()
const url = 'mongodb+srv://JD07:dikadika007@database.weqvd.mongodb.net/rest?retryWrites=true&w=majority'
const userRoutes = require('./routes/user.js')
const adminRoutes=require('./routes/admin.js')
const connectDb = require('./db/db.js')
const Logger = require('./logger/logger.js')
const logger = new Logger()

app.use(express.json())
app.use(userRoutes)
app.use(adminRoutes)
app.listen(PORT, () => {
    connectDb(url).catch((err) => {
        logger.error(err.message)
        app.close
    })
    logger.info(`server is start in ${PORT} port`)
})