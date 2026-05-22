const normalizeId      = require('../utils/normalizeId');
const { getProductById } = require('../services/productService');
 
/**
 * Middleware que valida el parámetro :id de la ruta.
 * - ID no numérico o inválido → 400
 * - ID numérico pero sin producto en DB → 404
 * - ID válido y producto encontrado → agrega req.product y llama next()
 */
const validateProductId = (req, res, next) => {
    const id = normalizeId(req.params.id);
 
    if (!id) {
        return res.status(400).render('pages/400');
    }
 
    const product = getProductById(id);
 
    if (!product) {
        return res.status(404).render('pages/404');
    }
 
    // Producto encontrado → lo adjuntamos al request para no buscarlo dos veces
    req.product = product;
    next();
};
 
module.exports = validateProductId;