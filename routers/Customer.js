const express = require('express');
const CustomerCtrl = require('../controllers/Customer');

const router = express.Router();



router.get('/', CustomerCtrl.GetAllCustomers);
router.get('/:id', CustomerCtrl.GetOneCustomer);
router.post('/', CustomerCtrl.CreateCustomer);
router.put('/:id', CustomerCtrl.UpdateCustomer);
router.delete('/:id', CustomerCtrl.DeleteCustomer);

module.exports = router;