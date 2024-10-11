const express = require('express');
const CategoryCtrl = require('../controllers/Category');

const auth = require('../middleware/Authentification');

const router = express.Router();

router.use(auth.Auth);

router.get('/', auth.user,CategoryCtrl.GetAllCategories);
router.post('/', auth.user,CategoryCtrl.CreateCategory);
router.delete('/:id', auth.user,CategoryCtrl.DeleteCategory);

module.exports = router;