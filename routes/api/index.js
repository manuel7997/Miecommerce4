const express = require('express');
const router = express.Router();

router.use('/products', require('./productsApiRoute'));
router.use('/categories', require('./categoriesApiRoute'));
router.use('/stats', require('./statsApiRoute'));
router.use('/users', require('./usersApiRoute'));

module.exports = router;