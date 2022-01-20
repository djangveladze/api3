const mongoose = require('mongoose')
const Logger = require('../logger/logger.js')
const logger = new Logger()

async function connectDb(url) {
    logger.info("Connecting To Database...")
    await mongoose.connect(url)
    logger.info("Connect to Database")
}

module.exports = connectDb