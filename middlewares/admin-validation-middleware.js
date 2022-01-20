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

    async validateRecover(req, res, next) {
        try {
            const { nickname: recoverUserNickname } = req.query
            await this.userValidator.validateDeleteUserByNickname(recoverUserNickname)
            await this._validateAdmin(req)
            next()
        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }

    async validateUpdate(req, res, next) {
        try {
            const { nickname: updatedUserNickname } = req.query
            await this.userValidator.validateUserByNickname(updatedUserNickname)
            await this._validateAdmin(req)
            const ifUnmodifiedSince = req.headers["if-unmodified-since"]
            if (ifUnmodifiedSince !== undefined) {
                const userUpdateAt = this.userService.getUserUpdateAt(updatedUserNickname)
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

    async validateDelete(req, res, next) {
        try {
            const { nickname: deletedUserNickname } = req.query
            await this.userValidator.validateUserByNickname(deletedUserNickname)
            await this._validateAdmin(req)
            const ifUnmodifiedSince = req.headers["if-unmodified-since"]
            if (ifUnmodifiedSince !== undefined) {
                const userUpdateAt = this.userService.getUserUpdateAt(deletedUserNickname)
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

    async _validateAdmin(req) {
        const jwtToken = req.headers.authorization.split(' ')[1]
        const nickname = await this.tokenValidator.validateJwtToken(jwtToken)
        await this.adminValidator.validateAdmin(nickname)
    }

}

module.exports = AdminValidationMiddleware