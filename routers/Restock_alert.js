const express = require('express');
const AlertCtrl = require('../controllers/Restocks_alert');

const router = express.Router();



router.get('/', AlertCtrl.GetAllAlerts);
router.get('/:id', AlertCtrl.GetOneAlerts);

router.put('/:id', AlertCtrl.UpdateAlerts);
router.delete('/:id', AlertCtrl.DeleteAlerts);

router.post('/ai', AlertCtrl.CallIaPrediction)

module.exports = router;