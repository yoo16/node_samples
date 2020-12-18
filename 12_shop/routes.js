// //モジュール読み込み
const express = require('express')
const router = express.Router()

// //Controller
const itemController = require('./controllers/ItemController')

//item
router.get('/item/', itemController.index)
router.get('/item/create', itemController.create)
router.post('/item/add', itemController.add)
router.get('/item/edit/:id', itemController.edit)
router.post('/item/update/:id', itemController.update)

module.exports = router