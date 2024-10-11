const express = require('express');
const CustomerCtrl = require('../controllers/Customer');
const auth = require('../middleware/Authentification');


const router = express.Router();

router.use(auth.Auth);


router.get('/', auth.user,CustomerCtrl.GetAllCustomers);
router.get('/:id', auth.user ,CustomerCtrl.GetOneCustomer);
router.post('/', auth.user,CustomerCtrl.CreateCustomer);
router.put('/:id', auth.user,CustomerCtrl.UpdateCustomer);
router.delete('/:id', auth.user,CustomerCtrl.DeleteCustomer);

module.exports = router;