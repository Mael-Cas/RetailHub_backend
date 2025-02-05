const express = require('express');
const SaleCtrl = require('../controllers/Sale');
const auth = require('../middleware/Authentification');


const router = express.Router();

router.use(auth.Auth);

/**
 * @swagger
 * tags:
 *   name: Sale
 *   description: API de gestion des ventes
 */

/**
 * @swagger
 * /sale:
 *   get:
 *     summary: Récupérer toutes les ventes avec filtres optionnels
 *     tags: [Sale]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: years
 *         schema:
 *           type: boolean
 *         description: Regrouper par années
 *       - in: query
 *         name: months
 *         schema:
 *           type: boolean
 *         description: Regrouper par mois
 *       - in: query
 *         name: weeks
 *         schema:
 *           type: boolean
 *         description: Regrouper par semaines
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Année spécifique à filtrer
 *       - in: query
 *         name: week
 *         schema:
 *           type: integer
 *         description: Semaine spécifique à filtrer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre maximal de résultats
 *     responses:
 *       200:
 *         description: Liste des ventes récupérée avec succès
 *       404:
 *         description: Aucune vente trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/', SaleCtrl.GetAllSales);

/**
 * @swagger
 * /sale/{id}:
 *   get:
 *     summary: Récupérer une vente par son ID
 *     tags: [Sale]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la vente à récupérer
 *     responses:
 *       200:
 *         description: Vente récupérée avec succès
 *       404:
 *         description: Aucune vente trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', SaleCtrl.GetOneSale);

/**
 * @swagger
 * /sale:
 *   post:
 *     summary: Créer une nouvelle vente et mettre à jour le stock
 *     tags: [Sale]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     SKU:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Vente créée avec succès
 *       404:
 *         description: Stock insuffisant pour un ou plusieurs produits
 *       400:
 *         description: Erreur lors de la création de la vente
 */
router.post('/', SaleCtrl.CreateSale);

/**
 * @swagger
 * /sale/{id}:
 *   put:
 *     summary: Mettre à jour une vente par son ID
 *     tags: [Sale]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la vente à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     SKU:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Vente mise à jour avec succès
 *       400:
 *         description: Erreur lors de la mise à jour de la vente
 */
router.put('/:id', SaleCtrl.UpdateSale);

/**
 * @swagger
 * /sale/{id}:
 *   delete:
 *     summary: Supprimer une vente par son ID
 *     tags: [Sale]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la vente à supprimer
 *     responses:
 *       200:
 *         description: Vente supprimée avec succès
 *       404:
 *         description: Aucune vente trouvée
 *       500:
 *         description: Erreur lors de la suppression de la vente
 */
router.delete('/:id', SaleCtrl.DeleteSale);

module.exports = router;