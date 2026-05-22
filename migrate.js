const db       = require('./db/database');
const products = require('./models/products.json');
 
console.log('[Migrate] Iniciando migración de productos...');
 
const insert = db.prepare(`
    INSERT OR IGNORE INTO products
        (id, name, price, description, image, featured, stock, category)
    VALUES
        (@id, @name, @price, @description, @image, @featured, @stock, @category)
`);
 
// 🔄 Usar transacción para insertar todos de una sola vez
const migrate = db.transaction((products) => {
    for (const product of products) {
        insert.run({
            id:          product.id,
            name:        product.name,
            price:       product.price,
            description: product.description || '',
            image:       product.images?.[0] || '',
            featured:    product.featured ? 1 : 0,
            stock:       product.stock ?? 0,
            category:    product.category || ''
        });
    }
});
 
migrate(products);
 
console.log(`[Migrate] ✅ ${products.length} productos migrados correctamente.`);
console.log('[Migrate] Ya podés eliminar models/products.json y models/productModel.js');