const UserRepository = require('../db/user-repository.js')
const Logger = require('../logger/logger.js')
const CryptoHashGenerator = require('../core/cryptohash-generator.js')

class AdminService {
    constructor() {
        this.userRepository = new UserRepository()
        this.cryptoHashGenerator = new CryptoHashGenerator()
        this.logger = new Logger()
    }

    async changeUserPassword(nickname, password) {
        try {
            const { hash, salt } = this.cryptoHashGenerator.generateHash(password)
            await this.userRepository.changeUserPassword(hash)
            await this.userRepository.changeUserSalt(salt)
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    async updateUser(nickname, userUpdateProperties) {
        try {
            await this.userRepository.updateUser(nickname, userUpdateProperties)
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    async deleteUser(nickname) {
        try {
            await this.userRepository.deleteUser(nickname)
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    async recoverUser(nickname) {
        try {
            const recoverUser=await this.userRepository.recoverUser(nickname)
            return recoverUser
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

}

module.exports = AdminService