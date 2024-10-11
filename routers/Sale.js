const express = require('express');
const SaleCtrl = require('../controllers/Sale');
const auth = require('../middleware/Authentification');


const router = express.Router();

router.use(auth.Auth);

router.get('/', auth.user, SaleCtrl.GetAllSales);
router.get('/:id', auth.user,SaleCtrl.GetOneSale);
router.post('/', auth.user ,SaleCtrl.CreateSale);
router.put('/:id', auth.user ,SaleCtrl.UpdateSale);
router.delete('/:id', auth.user, SaleCtrl.DeleteSale);

module.exports = router;