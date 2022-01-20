const UserRepository = require('../db/user-repository.js')
const CryptoHash = require('../core/cryptohash-generator.js')
const Logger = require('../logger/logger.js')

class UserService {
    constructor() {
        this.logger = new Logger()
        this.cryptoHash = new CryptoHash()
        this.userRepository = new UserRepository()
    }

    async addUser(userProperties) {
        try {
            const { hash: pas, salt: salt } = await this.cryptoHash.generateHash(userProperties.password)
            await this.userRepository.add({
                nickname: userProperties.nickname,
                firstname: userProperties.firstname,
                surname: userProperties.surname,
                password: pas,
                salt: salt
            })
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    async getUserUpdateAt(nickname) {
        try {
            const updateAt = await this.userRepository.getUserUpdateAt(nickname)
            return updateAt
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    async findUserByNickname(nickname) {
        try {
            const user = await this.userRepository.findUserByNickname(nickname)
            return user
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    async findDeleteUserByNickname(nickname) {
        try {
            const user = await this.userRepository.findDeleteUserByNickname(nickname)
            return user
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    async checkIfUserExists(nickname, password) {
        try {
            const userSalt = await this.userRepository.getUserSalt(nickname)
            const userPassword = await this.userRepository.getUserPassword(nickname)
            const hashPassword = await this.cryptoHash.generateHashBySalt(password, userSalt)
            return hashPassword === userPassword
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

    async getLimitedUsers(limited, skip) {
        try {
            const users = await this.userRepository.getLimitedUsers(limited, skip)
            return users
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }
}

module.exports = UserService