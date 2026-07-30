const express = require('express');
const router  = express.Router();
const { getStats } = require('../../controllers/api/statsApiController');

router.get('/', getStats);

module.exports = router;