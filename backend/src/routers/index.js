const express = require('express')
const router = express.Router()
const middleware = require('../middleware/JWT')
const controller = require('../controller')

router.get('/api', middleware.authorized, controller.getPoke)
router.get('/api/limit/:lim', middleware.authorized, controller.getPokeLimit)

router.post('/api/register', controller.register)
router.post('/api/login', controller.login)

module.exports = router