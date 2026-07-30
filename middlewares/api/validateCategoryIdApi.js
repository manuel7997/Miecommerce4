const normalizeId = require('../../utils/normalizeId');

const validateCategoryIdApi = (req, res, next) => {
    const id = normalizeId(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    req.categoryId = id;
    next();
};

module.exports = validateCategoryIdApi;