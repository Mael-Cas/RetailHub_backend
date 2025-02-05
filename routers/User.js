const express = require('express');
const UserCtrl = require('../controllers/User');
const CustomerCtrl = require("../controllers/User");
const auth = require('../middleware/Authentification');


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: User
 *   description: API de gestion des vendeurs
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve all users
 *     description: Get a list of all users.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get('/', auth.Auth, UserCtrl.GetAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a specific user by ID
 *     description: Get a single user by their ID.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get('/:id', auth.Auth, UserCtrl.GetOneUser);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with hashed password and save it to the database.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               shopId:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Bad request
 */
router.post('/', UserCtrl.CreateUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update an existing user
 *     description: Update a user by their ID.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               shopId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully updated
 *       400:
 *         description: Bad request
 */
router.put('/:id', auth.Auth, UserCtrl.UpdateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their ID.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       400:
 *         description: Bad request
 */
router.delete('/:id', auth.Auth, UserCtrl.DeleteUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     description: User login with email and password, returns a token on successful login.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User logged in successfully with a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 userRole:
 *                   type: string
 *                 shopId:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Bad request
 */
router.post('/login', CustomerCtrl.Login);

module.exports = router;