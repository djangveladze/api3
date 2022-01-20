const ErrorCodeGenerator = require('../utils/error-code-generator.js')
const AdminService = require('../services/admin-service.js')

class AdminController {
    constructor() {
        this.errorCodeGenerator = new ErrorCodeGenerator()
        this.adminService = new AdminService()
    }

    async updateUser(req, res) {
        try {
            const { nickname } = req.query
            const { firstname, surname, password } = req.body
            if (password !== undefined) {
                await this.adminService.changeUserPassword(nickname, password)
            }
            const userUpdateProperties = {}
            if (firstname !== undefined) {
                userUpdateProperties.firstname = firstname
            }
            if (surname !== undefined) {
                userUpdateProperties.surname = surname
            }
            if (Object.keys(userUpdateProperties).length !== 0) {
                await this.adminService.updateUser(nickname, userUpdateProperties)
            }
            return res.status(200).send({
                message: 'user is updated'
            })
        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }

    async deleteUser(req, res) {
        try {
            const { nickname } = req.query
            await this.adminService.deleteUser(nickname)
            return res.status(200).send({
                message: "user is deleted"
            })
        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }

    async recoverUser(req, res) {
        try {
            const { nickname } = req.query
            const recoverUser = await this.adminService.recoverUser(nickname)
            return res.status(400).send(recoverUser)
        } catch (err) {
            const statusCode = this.errorCodeGenerator.generateErrorCode(err)
            return res.status(statusCode).send({
                message: err.message
            })
        }
    }
}

module.exports = AdminController