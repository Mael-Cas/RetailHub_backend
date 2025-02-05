const express = require('express');
const auth = require('../middleware/Authentification');



const ProductCtrl = require('../controllers/Product');

const router = express.Router();

router.use(auth.Auth);


/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API de gestion des produits
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: lmt
 *         schema:
 *           type: integer
 *         description: Limite du nombre de produits retournés
 *     responses:
 *       200:
 *         description: Liste des produits récupérée avec succès
 *       404:
 *         description: Aucun produit trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/', ProductCtrl.GetAllProducts);

/**
 * @swagger
 * /product/{sku}:
 *   get:
 *     summary: Récupérer un produit par son SKU
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: SKU du produit à récupérer
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:sku', ProductCtrl.GetOneProduct);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - SKU
 *               - price
 *               - details
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               SKU:
 *                 type: string
 *               price:
 *                 type: number
 *               details:
 *                 type: string
 *               update:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       400:
 *         description: Erreur lors de la création du produit
 */
router.post('/', ProductCtrl.CreateProduct);

/**
 * @swagger
 * /product/{sku}:
 *   put:
 *     summary: Mettre à jour un produit par son SKU
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: SKU du produit à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               details:
 *                 type: string
 *               update:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:sku', ProductCtrl.UpdateProduct);

/**
 * @swagger
 * /product/{sku}:
 *   delete:
 *     summary: Supprimer un produit par son SKU
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: SKU du produit à supprimer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:sku', ProductCtrl.DeleteProduct);

module.exports = router;