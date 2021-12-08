const express = require('express')
const router = express.Router()

// Controller
const homeController = require('./controllers/HomeController')
const itemController = require('./controllers/ItemController')
const loginController = require('./controllers/LoginController')
const userController = require('./controllers/UserController')

//home
router.get('/', homeController.index)
router.get('/profile', homeController.profile)

//item
router.get('/item', itemController.index)
router.get('/item/:id', itemController.show)

//login
router.get('/login', loginController.index)
router.post('/login/auth', loginController.auth)
router.post('/login/logout', loginController.logout)

//user
router.get('/user', userController.index)

module.exports = router