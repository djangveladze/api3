const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller.js')
const userController = new UserController()
const UserValidationMiddleware = require('../middlewares/user-validation-middleware.js')
const userValidationMiddleware = new UserValidationMiddleware()
router.get('/user', userValidationMiddleware.validateUserNickname.bind(userValidationMiddleware), async (req, res) => {
    await userController.getUserByNickname(req, res)
})
router.get('/users', userValidationMiddleware.validateSkipAndLimit.bind(userValidationMiddleware), async (req, res) => {
    await userController.getUsers(req, res)
})
router.post('/user/login',userValidationMiddleware.validateLogin.bind(userValidationMiddleware),async (req,res)=>{
    await userController.loginUser(req,res)
})
router.post('/register', userValidationMiddleware.validateUserRegister.bind(userValidationMiddleware), async (req, res) => {
    await userController.userRegister(req, res)
})

module.exports = router
