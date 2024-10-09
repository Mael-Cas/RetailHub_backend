const express = require('express');
const CategoryCtrl = require('../controllers/Category');

const router = express.Router();

router.get('/', CategoryCtrl.GetAllCategories);
router.post('/', CategoryCtrl.CreateCategory);
router.delete('/:id', CategoryCtrl.DeleteCategory);

module.exports = router;