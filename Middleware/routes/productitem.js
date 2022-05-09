const express = require('express');
const router = express.Router();

const getProductItems = require('../controllers/productitem')


router.route('/getproducts').get(getProductItems);


module.exports = router;