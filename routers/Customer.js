const express = require('express');
const CustomerCtrl = require('../controllers/Customer');
const auth = require('../middleware/Authentification');


const router = express.Router();

router.use(auth.Auth)


/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: API de gestion des clients
 */

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Récupérer tous les clients
 *     tags: [Customer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lmt
 *         schema:
 *           type: integer
 *         description: Limite du nombre de clients retournés
 *     responses:
 *       200:
 *         description: Liste des clients récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/', CustomerCtrl.GetAllCustomers);

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Récupérer un client par son ID
 *     tags: [Customer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du client à récupérer
 *     responses:
 *       200:
 *         description: Client récupéré avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', CustomerCtrl.GetOneCustomer);

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Créer un nouveau client
 *     tags: [Customer]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: object
 *                 required:
 *                   - street_Number
 *                   - street
 *                   - city
 *                   - state
 *                   - country
 *                   - countryCode
 *                 properties:
 *                   street_Number:
 *                     type: string
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *                   countryCode:
 *                     type: string
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *       400:
 *         description: Erreur lors de la création du client
 */
router.post('/', CustomerCtrl.CreateCustomer);

/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Mettre à jour un client par son ID
 *     tags: [Customer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du client à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client mis à jour avec succès
 *       404:
 *         description: Client non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', CustomerCtrl.UpdateCustomer);

/**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     summary: Supprimer un client par son ID
 *     tags: [Customer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du client à supprimer
 *     responses:
 *       200:
 *         description: Client et adresse associés supprimés avec succès
 *       404:
 *         description: Client non trouvé
 *       400:
 *         description: Erreur serveur
 */
router.delete('/:id', CustomerCtrl.DeleteCustomer);

module.exports = router;