const express = require('express');
const router  = express.Router();
const {
    getAll,
    getById,
    create,
    update,
    remove
} = require('../../controllers/api/productsApiController');
const validateProductIdApi = require('../../middlewares/api/validateProductIdApi');

router.get('/',        getAll);
router.get('/:id',     validateProductIdApi, getById);
router.post('/',       create);
router.put('/:id',     validateProductIdApi, update);
router.delete('/:id',  validateProductIdApi, remove);

module.exports = router;