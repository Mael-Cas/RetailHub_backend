const express = require('express');
const UserCtrl = require('../controllers/User');
const CustomerCtrl = require("../controllers/User");
const auth = require('../middleware/Authentification');


const router = express.Router();



router.get('/', auth.Auth,auth.admin,UserCtrl.GetAllUsers);
router.get('/:id', auth.Auth,auth.admin,UserCtrl.GetOneUser);
router.post('/', auth.Auth,auth.admin,UserCtrl.CreateUser);
router.put('/:id',auth.Auth, auth.admin,UserCtrl.UpdateUser);
router.delete('/:id',auth.Auth, auth.admin,UserCtrl.DeleteUser);

router.post('/login', CustomerCtrl.Login);

module.exports = router;