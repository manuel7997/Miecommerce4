const express           = require('express');
const router            = express.Router();
const { getProducts, getProductByIdController, searchProducts } = require('../controllers/productController');
const validateProductId = require('../middlewares/validateProductId');
 
router.get('/',            getProducts);
router.get('/product/:id', validateProductId, getProductByIdController);
router.get('/search',      searchProducts);
 
module.exports = router;