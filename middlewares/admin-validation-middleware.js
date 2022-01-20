const AdminValidator = require('../validation/admin-validator.js')
const ErrorCodeGenerator = require('../utils/error-code-generator.js')
const UserValidator = require('../validation/user-validator.js')
const HeaderValidator = require('../validation/header-validator.js')
const TokenValidator = require('../validation/token-validator.js')
const UserService = require('../services/user-service.js')


class AdminValidationMiddleware {
    constructor() {
        this.adminValidator = new AdminValidator()
        this.errorCodeGenerator = new ErrorCodeGenerator()
        this.userValidator = new UserValidator()
        this.headerValidator = new HeaderValidator()
        this.userService = new UserService()
        this.tokenValidator = new TokenValidator()
    }

    async validateUpdate(req, res, next) {
        try {
            const nickname = await this._validateAdmin(req)
            const ifUnmodifiedSince = req.headers["if-unmodified-since"]
            if (ifUnmodifiedSince !== undefined) {
                const userUpdateAt = this.userService.getUserUpdateAt(nickname)
                await this.headerValidator.validateIfUnmodifiedSince(userUpdateAt, ifUnmodifiedSince)
            }
            const { nickname: updatedUserNickname } = req.query
            await this.userValidator.validateUserByNickname(updatedUserNickname)
            next()
        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }

    async validateDelete(req, res, next) {
        try {
            const nickname = await this._validateAdmin(req)
            const ifUnmodifiedSince = req.headers["if-unmodified-since"]
            if (ifUnmodifiedSince !== undefined) {
                const userUpdateAt = this.userService.getUserUpdateAt(nickname)
                await this.headerValidator.validateIfUnmodifiedSince(userUpdateAt, ifUnmodifiedSince)
            }
            const { nickname: deletedUserNickname } = req.query
            await this.userValidator.validateUserByNickname(deletedUserNickname)
            next()

        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }

    async _validateAdmin(req) {
        const jwtToken = req.headers.authorization.split(' ')[1]
        const nickname = await this.tokenValidator.validateJwtToken(jwtToken)
        await this.adminValidator.validateAdmin(nickname)
        return nickname
    }

}

module.exports = AdminValidationMiddleware