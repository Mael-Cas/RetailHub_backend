const express = require('express');
const UserCtrl = require('../controllers/User');
const CustomerCtrl = require("../controllers/User");
const auth = require('../middleware/Authentification');


const router = express.Router();




router.get('/',auth.Auth,UserCtrl.GetAllUsers);
router.get('/:id',auth.Auth,UserCtrl.GetOneUser);
router.post('/',UserCtrl.CreateUser);
router.put('/:id',auth.Auth,UserCtrl.UpdateUser);
router.delete('/:id',auth.Auth,UserCtrl.DeleteUser);

router.post('/login', CustomerCtrl.Login);

module.exports = router;