const express = require('express');
const Address = require('../controllers/Address');
const router = express.Router();

router.get("/", Address.GetAllAddress);
router.get("/:id", Address.GetAddress);
router.post("/", Address.CreateAddress);
router.put("/:id", Address.UpdateAddress);
router.delete("/:id", Address.DeleteAddress);

module.exports = router;