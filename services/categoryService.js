const db = require('../db/database');

// 📋 Todas las categorías
const getAllCategories = () => {
    return db.prepare('SELECT * FROM categories').all();
};

// 📦 Categoría por ID
const getCategoryById = (id) => {
    return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
};

// ➕ Crear categoría
const createCategory = (data) => {
    const stmt = db.prepare('INSERT INTO categories (name) VALUES (?)');
    const result = stmt.run(data.name);
    return getCategoryById(result.lastInsertRowid);
};

// ✏️ Actualizar categoría
const updateCategory = (id, data) => {
    db.prepare('UPDATE categories SET name = ? WHERE id = ?').run(data.name, id);
    return getCategoryById(id);
};

const deleteCategory = (id) => {
    return db.prepare('DELETE FROM categories WHERE id = ?').run(id);
};

const getCategoriesCount = () => {
    return db.prepare('SELECT COUNT(*) AS total FROM categories').get().total;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesCount
};