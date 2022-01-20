const ValidationError = require("../errors/validation-error.js")
const JwtTokenGenerator = require('../core/jwt-token.js')
const ValidationMessageGenerator = require('../core/validation-message-generator')

class TokenValidator {
    constructor() {
        this.jwtTokenGenerator = new JwtTokenGenerator()
        this.validateMessageGenerator = new ValidationMessageGenerator()
    }

    async validateJwtToken(jwtToken) {
        try {
            const { nickname } = await this.jwtTokenGenerator.getUserByToken(jwtToken)
            return nickname
        } catch (err) {
            const incorrectJwtTokenMessage = this.validateMessageGenerator.generateIncorrectJwtTokenMessage()
            throw new ValidationError(incorrectJwtTokenMessage)
        }
    }
}

module.exports = TokenValidator