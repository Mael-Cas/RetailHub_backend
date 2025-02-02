const express = require('express');
const StoreProduct = require('../controllers/StoreProduct');
const AuthMiddleware = require('../middleware/Authentification');
const router = express.Router();


router.use(AuthMiddleware.Auth)

router.get("/", StoreProduct.GetAllSProduct);
router.get("/:id", StoreProduct.GetSProduct);
router.post("/", StoreProduct.CreateSProduct);
router.put("/:id", StoreProduct.UpdateSProduct);
router.delete("/:id", StoreProduct.DeleteSProduct);

module.exports = router;