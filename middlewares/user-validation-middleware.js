const UserValidator = require('../validation/user-validator.js')
const ErrorCodeGenerator = require('../utils/error-code-generator.js')
const UserService = require('../services/user-service.js')
const HeaderValidator = require('../validation/header-validator.js')

class UserValidationMiddleware {
    constructor() {
        this.userValidator = new UserValidator()
        this.errorCodeGenerator = new ErrorCodeGenerator()
        this.userService = new UserService()
        this.headerValidator = new HeaderValidator()
    }

    async validateUserNickname(req, res, next) {
        try {
            const { nickname } = req.query
            await this.userValidator.validateNickname(nickname)
            const ifUnmodifiedSince = req.headers["if-unmodified-since"]
            const userUpdateAt = await this.userService.getUserUpdateAt(nickname)
            if (ifUnmodifiedSince !== undefined) {
                await this.headerValidator.validateIfUnmodifiedSince(userUpdateAt, ifUnmodifiedSince)
            }
            next()
        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }

    async validateSkipAndLimit(req, res, next) {
        try {
            const { skip = 0, limit = 0 } = req.query
            this.userValidator.validateSkip(skip)
            this.userValidator.validateLimit(limit)
            next()
        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }

    async validateUserRegister(req, res, next) {
        try {
            const { nickname, firstname, surname, password } = req.body
            this.userValidator.validateRegistrationParams(nickname, firstname, surname, password)
            next()
        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }

    async validateLogin(req, res, next) {
        try {
            const { nickname, password } = req.body
            await this.userValidator.validateLoginParams(nickname,password)
            next()
        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }
}

module.exports = UserValidationMiddleware