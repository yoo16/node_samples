const express = require('express')
const router = express.Router()

// Controller
const HomeController = require('./controllers/HomeController')
const TweetController = require('./controllers/TweetController')
const LoginController = require('./controllers/LoginController')
const UserController = require('./controllers/UserController')
const RegistController = require('./controllers/RegistController')

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
router.get('/', HomeController.index)

//tweet
router.get('/api/tweet', TweetController.index)
router.get('/api/tweet/:id', TweetController.show)

//login
router.get('/login', LoginController.index)
router.post('/login/auth', LoginController.auth)
router.get('/logout', LoginController.logout)

//user
router.get('/user', UserController.index)
router.get('/user/profile', UserController.profile)

//regist
router.get('/regist', RegistController.index)
router.post('/regist/add', RegistController.add)

module.exports = router