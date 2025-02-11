const express = require('express');
const router = express.Router();

const HomeController = require('./controllers/HomeController');
const ItemController = require('./controllers/ItemController');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');

router.get('/', HomeController.index);
router.get('/profile', HomeController.profile);

router.get('/login', LoginController.index)
router.post('/auth', LoginController.auth)

router.get("/item/", ItemController.index)
router.get("/item/:id", ItemController.show)

router.get("/user/", UserController.index)
router.get("/user/logout", UserController.logout)

module.exports = router