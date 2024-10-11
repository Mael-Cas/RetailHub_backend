const express = require('express');
const UserCtrl = require('../controllers/User');
const CustomerCtrl = require("../controllers/User");
const auth = require('../middleware/Authentification');


const router = express.Router();


router.use(auth.Auth);

router.get('/', auth.admin,UserCtrl.GetAllUsers);
router.get('/:id', auth.admin,UserCtrl.GetOneUser);
router.post('/', auth.admin,UserCtrl.CreateUser);
router.put('/:id', auth.admin,UserCtrl.UpdateUser);
router.delete('/:id', auth.admin,UserCtrl.DeleteUser);

router.post('/login', CustomerCtrl.Login);

module.exports = router;