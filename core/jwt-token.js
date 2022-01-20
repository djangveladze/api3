const jwt = require('jsonwebtoken')

class TokenGenerator {
    constructor() {
        this.secret = '49c4c5635ffc07e9e3e74ebf27e7d798'
    }

    async generateJwtToken(user) {
        const accessToken = await jwt.sign(user, this.secret)
        return accessToken
    }

    async getUserByToken(token) {
        const user = await jwt.verify(token, this.secret)
        return user
    }
}

module.exports = TokenGenerator