// //モジュール読み込み
const express = require('express')
const router = express.Router()

// //Controller
const homeController = require('./controllers/HomeController')
const userController = require('./controllers/UserController')

// //ルーティング
//home
router.get('/', homeController.index)
router.get('/about', homeController.about)

//user
router.get('/user', userController.index)
router.get('/user/login', userController.login)
router.get('/user/logout', userController.logout)
router.post('/user/auth', userController.auth)

module.exports = router