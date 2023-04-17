const express = require('express')
const router = express.Router()

const UserDetailController = require('../controllers/UserDetails')

router.get('/',UserDetailController.index)
router.post('/show',UserDetailController.show)
router.post('/store',UserDetailController.store)
router.post('/update',UserDetailController.update)
router.post('/delete',UserDetailController.destroy)

module.exports = router