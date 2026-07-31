const normalizeId = require('../../utils/normalizeId');

const validateUserIdApi = (req, res, next) => {
    const id = normalizeId(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    req.userId = id;
    next();
};

module.exports = validateUserIdApi;
