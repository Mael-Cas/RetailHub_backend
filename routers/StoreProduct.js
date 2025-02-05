const express = require('express');
const StoreProduct = require('../controllers/StoreProduct');
const AuthMiddleware = require('../middleware/Authentification');
const router = express.Router();


router.use(AuthMiddleware.Auth)

/**
 * @swagger
 * tags:
 *   name: StoreProduct
 *   description: API de gestion des produits en magasin
 */

/**
 * @swagger
 * /storeproduct:
 *   get:
 *     summary: Retrieve all store products
 *     description: Get a list of all store products.
 *     tags: [StoreProduct]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: lmt
 *         in: query
 *         description: Limit the number of products returned
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of store products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StoreProduct'
 *       500:
 *         description: Internal server error
 */
router.get("/", StoreProduct.GetAllSProduct);

/**
 * @swagger
 * /storeproduct/{id}:
 *   get:
 *     summary: Retrieve a specific store product by ID
 *     description: Get a single store product by its ID.
 *     tags: [StoreProduct]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the store product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A store product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreProduct'
 *       500:
 *         description: Internal server error
 */
router.get("/:id", StoreProduct.GetSProduct);

/**
 * @swagger
 * /storeproduct:
 *   post:
 *     summary: Create a new store product
 *     description: Create a new store product.
 *     tags: [StoreProduct]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slot:
 *                 type: string
 *               current_stock:
 *                 type: integer
 *               reorder_level:
 *                 type: integer
 *               productSKU:
 *                 type: string
 *     responses:
 *       200:
 *         description: Store product successfully created
 *       500:
 *         description: Internal server error
 */
router.post("/", StoreProduct.CreateSProduct);

/**
 * @swagger
 * /storeproduct/{id}:
 *   put:
 *     summary: Update an existing store product
 *     description: Update a store product by its ID.
 *     tags: [StoreProduct]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the store product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slot:
 *                 type: string
 *               current_stock:
 *                 type: integer
 *               reorder_level:
 *                 type: integer
 *               productSKU:
 *                 type: string
 *     responses:
 *       200:
 *         description: Store product successfully updated
 *       500:
 *         description: Internal server error
 */
router.put("/:id", StoreProduct.UpdateSProduct);

/**
 * @swagger
 * /storeproduct/{id}:
 *   delete:
 *     summary: Delete a store product
 *     description: Delete a store product by its ID.
 *     tags: [StoreProduct]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the store product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store product successfully deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", StoreProduct.DeleteSProduct);

module.exports = router;