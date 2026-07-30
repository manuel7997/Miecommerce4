const normalizeId       = require('../../utils/normalizeId');
const { getProductById } = require('../../services/productService');

/**
 * Middleware API que valida :id.
 * - ID inválido → 400 JSON
 * - ID válido sin producto → deja pasar (el controller decide 404,
 *   porque en creación/actualización el manejo puede variar)
 */
const validateProductIdApi = (req, res, next) => {
    const id = normalizeId(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    req.productId = id;
    next();
};

module.exports = validateProductIdApi;