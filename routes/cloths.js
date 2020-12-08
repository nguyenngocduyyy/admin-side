const express = require('express');
const router = express.Router();
const clothController = require('../controllers/clothController');

/* GET list of books. */
router.get('/', clothController.index);
router.get('/:id', clothController.details);

module.exports = router;