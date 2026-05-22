const cartService        = require('../services/cartService');
const { getProductById, hasStock } = require('../services/productService');
 
// 🛒 Ver carrito
const getCart = (req, res) => {
    const cartItems = cartService.buildCartItems(req.session, getProductById);
    const total     = cartService.calcTotal(cartItems);
    res.render('pages/cart', { cartItems, total });
};
 
// ➕ Agregar producto — producto ya validado por middleware en req.product
const addToCart = (req, res) => {
    const { id } = req.product;
 
    if (!hasStock(id)) return res.redirect('/');
 
    cartService.addItem(req.session, id);
    res.redirect('/cart');
};
 
// ➕ Aumentar cantidad
const increaseQuantity = (req, res) => {
    cartService.increaseItem(req.session, req.product.id);
    res.redirect('/cart');
};
 
// ➖ Disminuir cantidad
const decreaseQuantity = (req, res) => {
    cartService.decreaseItem(req.session, req.product.id);
    res.redirect('/cart');
};
 
// ❌ Eliminar producto
const removeFromCart = (req, res) => {
    cartService.removeItem(req.session, req.product.id);
    res.redirect('/cart');
};
 
// 🗑️ Vaciar carrito
const clearCart = (req, res) => {
    cartService.clearCart(req.session);
    res.redirect('/cart');
};
 
module.exports = { getCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart };