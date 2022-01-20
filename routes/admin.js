const express = require('express')
const router = express.Router()
const AdminValidationMiddleware = require('../middlewares/admin-validation-middleware.js')
const adminValidationMiddleware = new AdminValidationMiddleware()
const AdminController = require('../controllers/admin-controller.js')
const adminController = new AdminController()
router.put('/user/edit', adminValidationMiddleware.validateUpdate.bind(adminValidationMiddleware), async (req, res) => {
    await adminController.updateUser(req, res)
})
router.delete('/user', adminValidationMiddleware.validateDelete.bind(adminValidationMiddleware), async (req, res) => {
    await adminController.deleteUser(req, res)
})
router.put('/user/recover', adminValidationMiddleware.validateRecover.bind(adminValidationMiddleware), async (req, res) => {
    await adminController.recoverUser(req, res)
})
module.exports = router