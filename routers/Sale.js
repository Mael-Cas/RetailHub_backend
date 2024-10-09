const express = require('express');
const SaleCtrl = require('../controllers/Sale');

const router = express.Router();



router.get('/', SaleCtrl.GetAllSales);
router.get('/:id', SaleCtrl.GetOneSale);
router.post('/', SaleCtrl.CreateSale);
router.put('/:id', SaleCtrl.UpdateSale);
router.delete('/:id', SaleCtrl.DeleteSale);

module.exports = router;