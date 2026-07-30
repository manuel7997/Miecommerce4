const db = require('./db/database');

console.log('[Migrate Categories] Poblando tabla categories desde products...');

const categorias = db.prepare(
    'SELECT DISTINCT category FROM products WHERE category IS NOT NULL AND category != \'\''
).all();

const insert = db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)');

const migrate = db.transaction((rows) => {
    for (const row of rows) {
        insert.run(row.category);
    }
});

migrate(categorias);

console.log(`[Migrate Categories] ✅ ${categorias.length} categorías migradas.`);