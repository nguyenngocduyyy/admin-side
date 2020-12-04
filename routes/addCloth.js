const express = require('express');
const router = express.Router();
const addClothController = require('../controllers/addClothController');

router.get('/', addClothController.index);
router.post('/', addClothController.add);

module.exports = router;