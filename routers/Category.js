const express = require('express');
const CategoryCtrl = require('../controllers/Category');

const auth = require('../middleware/Authentification');

const router = express.Router();

router.use(auth.Auth);

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API de gestion des catégories
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de toutes les catégories
 *       500:
 *         description: Erreur serveur
 */
router.get('/', CategoryCtrl.GetAllCategories);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags: [Category]
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
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès
 *       400:
 *         description: Erreur lors de la création de la catégorie
 */
router.post('/', CategoryCtrl.CreateCategory);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Supprimer une catégorie par son ID
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie à supprimer
 *     responses:
 *       204:
 *         description: Catégorie supprimée avec succès
 *       400:
 *         description: Erreur lors de la suppression de la catégorie
 */
router.delete('/:id', CategoryCtrl.DeleteCategory);

module.exports = router;