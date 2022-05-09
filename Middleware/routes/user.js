const express = require('express')
const router = express.Router()
const {getCredentials,addUser} = require('../controllers/user')




router.route('/credentials').get(getCredentials)
router.route('/adduser').post(addUser)


module.exports = router