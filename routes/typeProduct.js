const express = require('express');
const router = express.Router();
const typeProductController = require('../controllers/typeProductController');

router.get('/', typeProductController.index);
router.get('/editTypeProduct', typeProductController.addGet);
router.get('/editTypeProduct/:id', typeProductController.editGet);
router.get('/editTypeProduct/:id/remove', typeProductController.remove);
router.post('/editTypeProduct/', typeProductController.addPost);
router.post('/editTypeProduct/:id', typeProductController.editPost);

module.exports = router;