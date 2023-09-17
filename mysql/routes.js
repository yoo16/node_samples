const express = require('express')
const router = express.Router()

// Controller
const homeController = require('./controllers/HomeController')
const itemController = require('./controllers/ItemController')
const loginController = require('./controllers/LoginController')
const userController = require('./controllers/UserController')

//セッション
router.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

//認証チェック
router.use(['/user*', '/item*'], (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
})

//home
router.get('/', homeController.index)

//item
router.get('/item', itemController.index)
router.get('/item/:id', itemController.show)

//login
router.get('/login', loginController.index)
router.post('/login/auth', loginController.auth)
router.get('/logout', loginController.logout)

//user
router.get('/user', userController.index)
router.get('/user/profile', userController.profile)

module.exports = router