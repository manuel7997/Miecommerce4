const express = require('express');
const router  = express.Router();
const {
    getAll,
    getById,
    create,
    update,
    remove
} = require('../../controllers/api/usersApiController');
const validateUserIdApi = require('../../middlewares/api/validateUserIdApi');

router.get('/',       getAll);
router.get('/:id',    validateUserIdApi, getById);
router.post('/',      create);
router.put('/:id',    validateUserIdApi, update);
router.delete('/:id', validateUserIdApi, remove);

module.exports = router;
