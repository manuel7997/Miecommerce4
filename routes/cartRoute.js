const express           = require('express');
const router            = express.Router();
const { getCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = require('../controllers/cartController');
const validateProductId = require('../middlewares/validateProductId');
 
router.get('/cart',                                 getCart);
router.get('/add-to-cart/:id',    validateProductId, addToCart);
router.get('/cart/increase/:id',  validateProductId, increaseQuantity);
router.get('/cart/decrease/:id',  validateProductId, decreaseQuantity);
router.get('/cart/remove/:id',    validateProductId, removeFromCart);
router.get('/cart/clear',                           clearCart);
 
module.exports = router;