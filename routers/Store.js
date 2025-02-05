const express = require('express');
const Store = require('../controllers/Store');
const Authentication = require('../middleware/Authentification');

const router = express.Router();

router.use(Authentication.Auth);

/**
 * @swagger
 * tags:
 *   name: Store
 *   description: API de gestion des magasins
 */

/**
 * @swagger
 * /store:
 *   get:
 *     summary: Retrieve all stores
 *     description: Get a list of all stores.
 *     tags: [Store]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 *       500:
 *         description: Internal server error
 */
router.get("/", Store.GetAllStore);

/**
 * @swagger
 * /store/{id}:
 *   get:
 *     summary: Retrieve a specific store by ID
 *     description: Get a single store by its ID.
 *     tags: [Store]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the store to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A store object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       500:
 *         description: Internal server error
 */
router.get("/:id", Store.GetStore);

/**
 * @swagger
 * /store:
 *   post:
 *     summary: Create a new store
 *     description: Create a new store along with an associated manager and address.
 *     tags: [Store]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street_Number:
 *                 type: string
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               countryCode:
 *                 type: string
 *               license_Number:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Store successfully created
 *       500:
 *         description: Internal server error
 */
router.post("/", Store.CreateStore);

/**
 * @swagger
 * /store/{id}:
 *   put:
 *     summary: Update an existing store
 *     description: Update a store's details by ID.
 *     tags: [Store]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the store to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               license_Number:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Store successfully updated
 *       500:
 *         description: Internal server error
 */
router.put("/:id", Store.UpdateStore);

/**
 * @swagger
 * /store/{id}:
 *   delete:
 *     summary: Delete a store
 *     description: Delete a store by its ID.
 *     tags: [Store]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the store to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store successfully deleted
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", Store.DeleteStore);

module.exports = router;