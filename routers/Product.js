const express = require('express');


const ProductCtrl = require('../controllers/Product');

const router = express.Router();




router.get('/', ProductCtrl.GetAllProducts);
router.get('/:sku', ProductCtrl.GetOneProduct);
router.post('/', ProductCtrl.CreateProduct);
router.put('/:sku', ProductCtrl.UpdateProduct);
router.delete('/:sku', ProductCtrl.DeleteProduct);

module.exports = router;