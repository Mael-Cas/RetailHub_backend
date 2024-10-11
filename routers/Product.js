const express = require('express');
const auth = require('../middleware/Authentification');



const ProductCtrl = require('../controllers/Product');

const router = express.Router();

router.use(auth.Auth);


router.get('/', auth.user,ProductCtrl.GetAllProducts);
router.get('/:sku', auth.user,ProductCtrl.GetOneProduct);
router.post('/', auth.admin,ProductCtrl.CreateProduct);
router.put('/:sku', auth.user,ProductCtrl.UpdateProduct);
router.delete('/:sku', auth.admin,ProductCtrl.DeleteProduct);

module.exports = router;