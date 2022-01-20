const ValidationMessageGenerator = require('../core/validation-message-generator.js')
const ValidationError = require('../errors/validation-error.js')
const UserService = require('../services/user-service.js')

class UserValidator {
    constructor() {
        this.messageGenerator = new ValidationMessageGenerator()
        this.userService = new UserService()
        this.avaliableRoles = ['user', 'admin', 'moderator']
        this.nicknameMaxLength = 20
        this.nicknameMinLength = 3
        this.firstnameMaxLength = 30
        this.firstnameMinLength = 2
        this.surnameMaxLength = 30
        this.surnameMinLength = 2
        this.passwordMaxLength = 40
        this.passwordMinLength = 5
    }

    validateRegistrationParams(nickname, firstname, surname, password) {
        this.validateNickname(nickname)
        this.validateFirstname(firstname)
        this.validateSurname(surname)
        this.validatePassword(password)
    }

    async validateLoginParams(nickname, password) {
        this.validateNickname(nickname)
        this.validatePassword(password)
        const userExists = await this.userService.checkIfUserExists(nickname, password)
        if (!userExists) {
            throw new Error("one of the login params is incorrect")
        }
    }

    validateSkip(skip) {
        const convertSkipToInteger = Number(skip)
        if (isNaN(convertSkipToInteger)) {
            const incorrectSkipMessage = this.messageGenerator.generateIncorrectSkipMessage()
            throw new ValidationError(incorrectSkipMessage)
        }
    }

    validateLimit(limit) {
        const convertLimitToInteger = Number(limit)
        if (isNaN(convertLimitToInteger)) {
            const incorrectLimitMessage = this.messageGenerator.generateIncorrectLimitMessage()
            throw new ValidationError(incorrectLimitMessage)
        }
    }

    async validateUserByNickname(nickname) {
        this.validateNickname(nickname)
        await this.userService.findUserByNickname(nickname)
    }

    validateRole(role) {
        if (!(this.avaliableRoles.includes(role))) {
            const incorrectRoleMessage = this.messageGenerator.generateIncorrectRoleMessage(this.avaliableRoles)
            throw new ValidationError(incorrectRoleMessage)
        }
    }

    validateNickname(nickname) {
        if (typeof (nickname) !== "string") {
            const incorrectTypeMessage = this.messageGenerator.generateIncorrectTypeMessage()
            throw new ValidationError(incorrectTypeMessage)
        }
        if (nickname.length < this.nicknameMinLength || nickname.length > this.nicknameMaxLength) {
            const incorrectNicknameMessage = this.messageGenerator.generateIncorrectNicknameMessage(this.nicknameMaxLength, this.nicknameMinLength)
            throw new ValidationError(incorrectNicknameMessage)
        }
    }

    validateFirstname(name) {
        if (typeof (name) !== "string") {
            const incorrectTypeMessage = this.messageGenerator.generateIncorrectTypeMessage()
            throw new ValidationError(incorrectTypeMessage)
        }
        if (name.length < this.firstnameMinLength || name.length > this.firstnameMaxLength) {
            const incorrectNameMessage = this.messageGenerator.generateIncorrectNameMessage(this.firstnameMaxLength, this.firstnameMinLength)
            throw new ValidationError(incorrectNameMessage)
        }
    }

    validateSurname(surname) {
        if (typeof (surname) !== "string") {
            const incorrectTypeMessage = this.messageGenerator.generateIncorrectTypeMessage()
            throw new ValidationError(incorrectTypeMessage)
        }
        if (surname.length < this.surnameMinLength || surname.length > this.surnameMaxLength) {
            const incorrectSurnameMessage = this.messageGenerator.generateIncorrectSurnameMessage(this.surnameMaxLength, this.surnameMinLength)
            throw new ValidationError(incorrectSurnameMessage)
        }
    }

    validatePassword(password) {
        if (typeof (password) !== "string") {
            const incorrectTypeMessage = this.messageGenerator.generateIncorrectTypeMessage()
            throw new ValidationError(incorrectTypeMessage)
        }
        if (password.length < this.passwordMinLength || password.length > this.passwordMaxLength) {
            const incorrectPasswordMessage = this.messageGenerator.generateIncorrectPasswordMessage(this.passwordMaxLength, this.passwordMinLength)
            throw new ValidationError(incorrectPasswordMessage)
        }
    }
}


module.exports = UserValidator