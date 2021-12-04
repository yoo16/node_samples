const express = require('express')
const router = express.Router()

// Controller
const home = require('./controllers/HomeController')
const item = require('./controllers/ItemController')
const login = require('./controllers/LoginController')
const user = require('./controllers/UserController')

//home
router.get('/', home.index)
router.get('/profile', home.profile)

//item
router.get('/item', item.index)
router.get('/item/:id', item.show)

//login
router.get('/login', login.index)
router.post('/login/auth', login.auth)
router.post('/login/logout', login.logout)

//user
router.get('/user', user.index)

module.exports = router