const express = require('express');
const CategoryCtrl = require('../controllers/Category');

const auth = require('../middleware/Authentification');

const router = express.Router();

router.use(auth.Auth);

router.get('/',CategoryCtrl.GetAllCategories);
router.post('/',CategoryCtrl.CreateCategory);
router.delete('/:id',CategoryCtrl.DeleteCategory);

module.exports = router;