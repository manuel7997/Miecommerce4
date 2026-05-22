const db = require('../db/database');
 
// 🔀 Obtener hasta N productos aleatorios de un array
const getRandomProducts = (arr, max = 5) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, max);
};
 
// 🗄️ Mapear fila de DB al formato que esperan las vistas
// Las vistas usan product.images[0], así que reconstruimos el array
const mapProduct = (row) => {
    if (!row) return null;
    return {
        ...row,
        featured: row.featured === 1,
        images: row.image ? [row.image] : []
    };
};
 
// 🏠 Productos para el home: sugeridos y destacados
const getHomeProducts = () => {
    const all      = db.prepare('SELECT * FROM products').all().map(mapProduct);
    const featured = db.prepare('SELECT * FROM products WHERE featured = 1 LIMIT 10').all().map(mapProduct);
    const suggested = getRandomProducts(all, 5);
    return { suggested, featured };
};
 
// 📦 Producto por ID
const getProductById = (id) => {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    return mapProduct(row);
};
 
// 🔗 Productos relacionados: misma categoría, excluyendo el actual
const getRelatedProducts = (product) => {
    if (!product.category) return [];
 
    const rows = db.prepare(
        'SELECT * FROM products WHERE category = ? AND id != ?'
    ).all(product.category, product.id).map(mapProduct);
 
    return rows.length > 4 ? getRandomProducts(rows, 4) : rows;
};
 
// 📂 Productos por categoría
const getProductsByCategory = (category) => {
    return db.prepare('SELECT * FROM products WHERE category = ?')
             .all(category)
             .map(mapProduct);
};
 
// ✅ Verificar si un producto tiene stock
const hasStock = (id) => {
    const product = getProductById(id);
    return product ? product.stock > 0 : false;
};
 
// 🔃 Ordenar productos por precio — solo acepta 'asc' o 'desc'
const sortByPrice = (arr, order) => {
    if (order !== 'asc' && order !== 'desc') return arr;
    return [...arr].sort((a, b) =>
        order === 'asc' ? a.price - b.price : b.price - a.price
    );
};
 
// 🔍 Buscar productos por nombre (coincidencia parcial, case-insensitive)
const searchByName = (query) => {
    const normalized = query.trim();
    if (!normalized) return [];
 
    return db.prepare('SELECT * FROM products WHERE LOWER(name) LIKE ?')
             .all(`%${normalized.toLowerCase()}%`)
             .map(mapProduct);
};
 
module.exports = {
    getHomeProducts,
    getProductById,
    getRelatedProducts,
    getProductsByCategory,
    hasStock,
    sortByPrice,
    searchByName
};