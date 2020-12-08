const express = require('express');
const router = express.Router();
const addClothController = require('../controllers/addClothController');
const clothController = require('../controllers/clothController');

router.get('/', addClothController.index);
router.get('/:id', addClothController.editGet);
router.get('/:id/remove', addClothController.remove);
router.post('/', addClothController.add);
router.post('/:id', addClothController.editPost);

module.exports = router;