const express = require('express');
const Role = require('../controllers/Role');
const router = express.Router();
const Auth = require('../middleware/Authentification');
router.use(Auth.Auth);

router.get("/", Role.GetAllRoles);
router.get("/:id", Role.GetRole);
router.post("/",Role.CreateRole);
router.put("/:id", Role.UpdateRole)
router.delete("/:id", Role.DeleteRole);

module.exports = router;