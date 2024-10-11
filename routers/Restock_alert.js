const express = require('express');
const AlertCtrl = require('../controllers/Restocks_alert');
const auth = require('../middleware/Authentification');


const router = express.Router();

router.use(auth.Auth);

router.get('/', auth.user,AlertCtrl.GetAllAlerts);
router.get('/:id', auth.user,AlertCtrl.GetOneAlerts);

router.put('/:id', auth.admin ,AlertCtrl.UpdateAlerts);
router.delete('/:id', auth.admin ,AlertCtrl.DeleteAlerts);

router.post('/ai', auth.admin ,AlertCtrl.CallIaPrediction)

module.exports = router;