const User = require('../models/User');
const bcrypt = require('bcrypt');

/**
 * Retrieves all users from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all users or an error message.
 */
exports.GetAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json(error));
};

/**
 * Retrieves a specific user by their ID.
 *
 * @param {Object} req - Express request object, containing the user ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with the user or an error message.
 */
exports.GetOneUser = (req, res, next) => {

    const id = req.params.id;
    User.findById(id)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error));
};

/**
 * Creates a new user with hashed password and saves it to the database.
 *
 * @param {Object} req - Express request object, containing the user data (email, password, name, role) in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a success message or an error message.
 */
exports.CreateUser = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                role: req.body.role
            });
            user.save()
                .then(()=>res.status(201).json({message: 'User saved successfully.'}))
                .catch(error => res.status(400).json(error));
        })


};

/**
 * Updates an existing user by their ID.
 *
 * @param {Object} req - Express request object, containing the updated user data in the body and the user ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a success message or an error message.
 */
exports.UpdateUser = (req, res, next) => {

    User.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'User updated successfully.'}))
        .catch(error => res.status(400).json(error));
};


/**
 * Deletes a user by their ID.
 *
 * @param {Object} req - Express request object, containing the user ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a success message or an error message.
 */
exports.DeleteUser = (req, res, next) => {
    const id = req.params.id;
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({message: 'User deleted successfully.'}))
        .catch(error => res.status(400).json(error));
};

