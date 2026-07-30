const { getProductsCount } = require('../../services/productService');
const { getCategoriesCount } = require('../../services/categoryService');

// 📊 GET /api/stats
const getStats = (req, res) => {
    try {
        const totalProducts   = getProductsCount();
        const totalCategories = getCategoriesCount();

        res.status(200).json({ totalProducts, totalCategories });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las estadísticas' });
    }
};

module.exports = { getStats };