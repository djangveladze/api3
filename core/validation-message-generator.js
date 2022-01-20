class ValidationMessageGenerator {
    generateIncorrectPasswordMessage(maxLength, minLength) {
        return `password max size should be ${maxLength} and min size should be ${minLength}`
    }

    generateIncorrectNicknameMessage(maxLength, minLength) {
        return `nickname max size should be ${maxLength} and min size should be ${minLength}`
    }

    generateIncorrectNameMessage(maxLength, minLength) {
        return `name max size should be ${maxLength} and min size should be ${minLength}`
    }

    generateIncorrectSurnameMessage(maxLength, minLength) {
        return `surname max size should be ${maxLength} and min size should be ${minLength}`
    }

    generateIncorrectTypeMessage() {
        return `one of the parameter type is incorrect`
    }

    generateIncorrectSkipMessage() {
        return `skip should be Number`
    }

    generateIncorrectLimitMessage() {
        return `limit should be Number`
    }

    generateIncorrectRoleMessage(availableRoles) {
        return `please chouse one of the role ${availableRoles}`
    }

    generateIncorrectJwtTokenMessage() {
        return `this access Token is not avaliable`
    }

}

module.exports = ValidationMessageGenerator