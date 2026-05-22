const { getHomeProducts, getRelatedProducts, sortByPrice, searchByName } = require('../services/productService');
 
// 🏠 Mostrar home con sugeridos y destacados — soporta ?sort=asc|desc
const getProducts = (req, res) => {
    const { suggested, featured } = getHomeProducts();
    const sort = req.query.sort;
 
    res.render('pages/index', {
        products: sortByPrice(suggested, sort),
        featured: sortByPrice(featured, sort),
        sort:     sort || ''
    });
};
 
// 📦 Mostrar detalle — producto ya validado por middleware, vive en req.product
const getProductByIdController = (req, res) => {
    const product = req.product;
    const related = getRelatedProducts(product);
    res.render('pages/product', { product, related });
};
 
// 🔍 Buscar productos por nombre
const searchProducts = (req, res) => {
    const query   = req.query.query || '';
    const results = searchByName(query);
    res.render('pages/search', { results, query });
};
 
module.exports = { getProducts, getProductByIdController, searchProducts };