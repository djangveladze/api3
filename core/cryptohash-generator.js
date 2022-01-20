const crypto = require('crypto')

class CryptoHashGenerator {
    constructor() {
        this.iterations = 10000
        this.keylen = 64
        this.digest = 'sha512'
    }

    async generateHash(text) {
        const randomString = await this._generateRandomString(10)
        const hashString = await crypto.pbkdf2Sync(text, randomString, this.iterations, this.keylen, this.digest)
        return { hash: hashString.toString('hex'), salt: randomString };
    }

    async _generateRandomString(len) {
        const s = await crypto.randomBytes(len)
        return s.toString("hex")
    }

    async generateHashBySalt(text, salt) {
        const hashString = await crypto.pbkdf2Sync(text, salt, this.iterations, this.keylen, this.digest)
        return hashString.toString('hex')
    }
}

module.exports = CryptoHashGenerator

