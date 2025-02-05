const express = require('express');
const Address = require('../controllers/Address');
const Authentification = require('../middleware/Authentification');

const router = express.Router();
router.use(Authentification.Auth)

/**
 * @swagger
 * tags:
 *   name: Address
 *   description: API de gestion des adresses
 */

/**
 * @swagger
 * /address:
 *   get:
 *     summary: Récupérer toutes les adresses
 *     tags: [Address]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de toutes les adresses
 *       500:
 *         description: Erreur serveur
 */
router.get("/", Address.GetAllAddress);

/**
 * @swagger
 * /address/{id}:
 *   get:
 *     summary: Récupérer une adresse par son ID
 *     tags: [Address]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'adresse à récupérer
 *     responses:
 *       200:
 *         description: Détails de l'adresse
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", Address.GetAddress);

/**
 * @swagger
 * /address:
 *   post:
 *     summary: Créer une nouvelle adresse
 *     tags: [Address]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - street_Number
 *               - street
 *               - city
 *               - state
 *               - country
 *               - countryCode
 *             properties:
 *               street_Number:
 *                 type: integer
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
 *     responses:
 *       200:
 *         description: Adresse créée avec succès
 *       400:
 *         description: Erreur lors de la création de l'adresse
 */
router.post("/", Address.CreateAddress);

/**
 * @swagger
 * /address/{id}:
 *   put:
 *     summary: Mettre à jour une adresse
 *     tags: [Address]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'adresse à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street_Number:
 *                 type: integer
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
 *     responses:
 *       200:
 *         description: Adresse mise à jour avec succès
 *       500:
 *         description: Erreur lors de la mise à jour
 */
router.put("/:id", Address.UpdateAddress);

/**
 * @swagger
 * /address/{id}:
 *   delete:
 *     summary: Supprimer une adresse
 *     tags: [Address]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'adresse à supprimer
 *     responses:
 *       200:
 *         description: Adresse supprimée avec succès
 *       400:
 *         description: Erreur lors de la suppression de l'adresse
 */
router.delete("/:id", Address.DeleteAddress);

module.exports = router;