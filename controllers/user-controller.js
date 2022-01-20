const UserService = require('../services/user-service.js')
const JwtTokenGenerator = require('../core/jwt-token.js')

class UserController {
    constructor() {
        this.userService = new UserService()
        this.jwtTokenGenerator = new JwtTokenGenerator()
    }

    async getUserByNickname(req, res) {
        try {
            const { nickname } = req.query
            const user = await this.userService.findUserByNickname(nickname)
            const userUpdateAt = await this.userService.getUserUpdateAt(nickname)
            res.setHeader('last-modified', new Date(userUpdateAt).toISOString())
            return res.status(200).send(user)
        } catch (err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    async getUsers(req, res) {
        try {
            const { skip = 0, limit = 0 } = req.query
            const users = await this.userService.getLimitedUsers(limit, skip)
            return res.status(200).send(users)
        } catch (err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    async loginUser(req, res) {
        try {
            const { nickname } = req.body
            const accessToken = await this.jwtTokenGenerator.generateJwtToken({
                nickname: nickname
            })
            res.status(200).send({
                "access-token": accessToken
            })
        } catch (err) {
            res.status(500).send({
                message: err.message
            })
        }
    }

    async userRegister(req, res) {
        try {
            const { nickname, firstname, surname, password } = req.body
            await this.userService.addUser({
                nickname: nickname,
                firstname: firstname,
                surname: surname,
                password: password
            })
            return res.status(200).send({
                message: `User is register`
            })
        } catch (err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }
}

module.exports = UserController