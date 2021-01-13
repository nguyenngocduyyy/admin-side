const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET list of books. */
router.get('/', userController.index);
router.get('/:id', userController.editGet);
router.get('/:id/activate', userController.activate);

module.exports = router;