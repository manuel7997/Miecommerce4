const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../../services/productService');

// 📋 GET /api/products
const getAll = (req, res) => {
    try {
        const products = getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// 📦 GET /api/products/:id
const getById = (req, res) => {
    try {
        const product = getProductById(req.productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// ➕ POST /api/products
const create = (req, res) => {
    try {
        const { name, price, category } = req.body;

        if (!name || price === undefined || !category) {
            return res.status(400).json({ error: 'name, price y category son obligatorios' });
        }

        const newProduct = createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// ✏️ PUT /api/products/:id
const update = (req, res) => {
    try {
        const existing = getProductById(req.productId);

        if (!existing) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const updated = updateProduct(req.productId, req.body);
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// ❌ DELETE /api/products/:id
const remove = (req, res) => {
    try {
        const existing = getProductById(req.productId);

        if (!existing) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        deleteProduct(req.productId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = { getAll, getById, create, update, remove };