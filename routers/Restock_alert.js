const express = require('express');
const AlertCtrl = require('../controllers/Restocks_alert');
const auth = require('../middleware/Authentification');


const router = express.Router();

router.use(auth.Auth);

router.get('/',AlertCtrl.GetAllAlerts);
router.get('/:id',AlertCtrl.GetOneAlerts);

router.put('/:id',AlertCtrl.UpdateAlerts);
router.delete('/:id',AlertCtrl.DeleteAlerts);

router.post('/ai',AlertCtrl.CallIaPrediction)

module.exports = router;