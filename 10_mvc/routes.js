// //モジュール読み込み
const express = require('express')
const router = express.Router()

// //Controller
const homeController = require('./controllers/HomeController')
const userController = require('./controllers/UserController')

// //ルーティング
router.get('/', homeController.index)
router.get('/about', homeController.about)

router.get('/login', userController.login)
router.get('/logout', userController.logout)
router.post('/auth', userController.auth)
router.get('/user', userController.index)

module.exports = router