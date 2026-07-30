const express = require('express');
const router  = express.Router();
const {
    getAll,
    getById,
    create,
    update,
    remove
} = require('../../controllers/api/categoriesApiController');
const validateCategoryIdApi = require('../../middlewares/api/validateCategoryIdApi');

router.get('/',       getAll);
router.get('/:id',    validateCategoryIdApi, getById);
router.post('/',      create);
router.put('/:id',    validateCategoryIdApi, update);
router.delete('/:id', validateCategoryIdApi, remove);

module.exports = router;