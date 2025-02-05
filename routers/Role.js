const express = require('express');
const Role = require('../controllers/Role');
const router = express.Router();
const Auth = require('../middleware/Authentification');
router.use(Auth.Auth);

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: API de gestion des rôles
 */

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Récupérer tous les rôles de la boutique
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des rôles récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", Role.GetAllRoles);

/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Récupérer un rôle par son ID
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rôle à récupérer
 *     responses:
 *       200:
 *         description: Rôle récupéré avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", Role.GetRole);

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Créer un nouveau rôle
 *     tags: [Role]
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
 *               - permissions
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Rôle créé avec succès
 *       400:
 *         description: Erreur lors de la création du rôle
 */
router.post("/", Role.CreateRole);

/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Mettre à jour un rôle par son ID
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rôle à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Rôle mis à jour avec succès
 *       400:
 *         description: Erreur lors de la mise à jour du rôle
 */
router.put("/:id", Role.UpdateRole);

/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Supprimer un rôle par son ID
 *     tags: [Role]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du rôle à supprimer
 *     responses:
 *       200:
 *         description: Rôle supprimé avec succès
 *       400:
 *         description: Erreur lors de la suppression du rôle
 */
router.delete("/:id", Role.DeleteRole);

module.exports = router;