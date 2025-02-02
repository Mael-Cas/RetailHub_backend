const express = require('express');
const Store = require('../controllers/Store');
const router = express.Router();

router.get("/", Store.GetAllStore);
router.get("/:id", Store.GetStore);
router.post("/", Store.CreateStore);
router.put("/:id", Store.UpdateStore);
router.delete("/:id", Store.DeleteStore);

module.exports = router;