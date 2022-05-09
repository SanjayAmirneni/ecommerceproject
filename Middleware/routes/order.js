const express = require('express');
const router = express.Router();

const {insertProducts,getOrderProducts} = require('../controllers/order')




router.route('/addorder').post(insertProducts)
router.route('/getorders').get(getOrderProducts)


module.exports = router;