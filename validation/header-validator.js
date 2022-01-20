const UnmodifiedError = require('../errors/unmodified-error.js')

class HeaderValidator {
    async validateIfUnmodifiedSince(updateAt, ifUnmodifiedSince) {
        const userUpdateAt = new Date(updateAt)
        const unmodifiedSince = new Date(ifUnmodifiedSince)
        if (userUpdateAt.getTime() < unmodifiedSince.getTime()) {
            throw new UnmodifiedError("user is update after if-unmodified-since")
        }
    }
}

module.exports = HeaderValidator