const express = require('express');
const auth = require('../middleware/Authentification');



const ProductCtrl = require('../controllers/Product');

const router = express.Router();

router.use(auth.Auth);


router.get('/',ProductCtrl.GetAllProducts);
router.get('/:sku',ProductCtrl.GetOneProduct);
router.post('/',ProductCtrl.CreateProduct);
router.put('/:sku',ProductCtrl.UpdateProduct);
router.delete('/:sku',ProductCtrl.DeleteProduct);

module.exports = router;