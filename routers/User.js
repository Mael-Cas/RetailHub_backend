const express = require('express');
const UserCtrl = require('../controllers/User');

const router = express.Router();




router.get('/', UserCtrl.GetAllUsers);
router.get('/:id', UserCtrl.GetOneUser);
router.post('/', UserCtrl.CreateUser);
router.put('/:id', UserCtrl.UpdateUser);
router.delete('/:id', UserCtrl.DeleteUser);

module.exports = router;