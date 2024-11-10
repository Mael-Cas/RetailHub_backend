const express = require('express');
const SaleCtrl = require('../controllers/Sale');
const auth = require('../middleware/Authentification');


const router = express.Router();

router.use(auth.Auth);

router.get('/', SaleCtrl.GetAllSales);
router.get('/:id',SaleCtrl.GetOneSale);
router.post('/',SaleCtrl.CreateSale);
router.put('/:id',SaleCtrl.UpdateSale);
router.delete('/:id', SaleCtrl.DeleteSale);

module.exports = router;