const express = require('express');
const router = express.Router();
const clothController = require('../controllers/clothController');

/* GET list of books. */
router.get('/', clothController.index);

module.exports = router;