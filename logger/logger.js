const logger = require('pino')

class Logger {
    constructor() {
        this.log = logger({
            prettyPrint: {
                colorize: true,
                levelFirst: true,
                translateTime: 'yyyy-dd-mm, h:MM:ss TT'
            }
        })
    }

    info(msg) {
        this.log.info(msg)
    }

    error(msg) {
        this.log.error(msg)
    }
}

module.exports = Logger