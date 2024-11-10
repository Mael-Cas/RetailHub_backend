const express = require('express');
const UserCtrl = require('../controllers/User');
const CustomerCtrl = require("../controllers/User");
const auth = require('../middleware/Authentification');


const router = express.Router();



router.get('/',UserCtrl.GetAllUsers);
router.get('/:id',UserCtrl.GetOneUser);
router.post('/',UserCtrl.CreateUser);
router.put('/:id',UserCtrl.UpdateUser);
router.delete('/:id',UserCtrl.DeleteUser);

router.post('/login', CustomerCtrl.Login);

module.exports = router;