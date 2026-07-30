const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../../services/categoryService');

// 📋 GET /api/categories
const getAll = (req, res) => {
    try {
        const categories = getAllCategories();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
};

// 📦 GET /api/categories/:id
const getById = (req, res) => {
    try {
        const category = getCategoryById(req.categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
};

// ➕ POST /api/categories
const create = (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'El campo name es obligatorio' });
        }

        const newCategory = createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (err) {
        // UNIQUE constraint u otro error
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

// ✏️ PUT /api/categories/:id
const update = (req, res) => {
    try {
        const existing = getCategoryById(req.categoryId);

        if (!existing) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        const { name } = req.body;
        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'El campo name es obligatorio' });
        }

        const updated = updateCategory(req.categoryId, req.body);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};

// ❌ DELETE /api/categories/:id
const remove = (req, res) => {
    try {
        const existing = getCategoryById(req.categoryId);

        if (!existing) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        deleteCategory(req.categoryId);
        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};

module.exports = { getAll, getById, create, update, remove };