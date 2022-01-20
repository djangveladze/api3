const UserService = require('../services/user-service.js')
const ValidationError = require('../errors/validation-error.js')
const UserValidator = require('../validation/user-validator.js')

class AdminValidator {
    constructor() {
        this.userService = new UserService()
        this.userValidator = new UserValidator()
    }

    async validateAdmin(nickname) {
        const user = await this.userService.findUserByNickname(nickname)
        this.userValidator.validateRole(user.role)
        if (user.role !== 'admin') {
            throw new ValidationError(`this active dont ${user.role} properties`)
        }
    }
}

module.exports = AdminValidator