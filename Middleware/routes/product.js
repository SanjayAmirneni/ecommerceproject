const express = require("express");
const router = express.Router();
const {addProduct,getProducts,deleteProducts} = require('../controllers/product')


router.route('/getproducts').get(getProducts);
router.route('/addproduct').post(addProduct);
router.route('/deleteproduct').delete(deleteProducts);
// router.route('/total').get(productTotal);


module.exports = router;