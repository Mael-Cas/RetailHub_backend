const Customer = require('../models/Customer');

/**
 * Retrieves all customers from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all customers or an error message.
 */
exports.GetAllCustomers = (req, res, next) => {
    Customer.find()
        .then(customer => res.status(200).json(customer))
        .catch(error => res.status(500).json(error));

};

/**
 * Retrieves a single customer from the database by its ID.
 *
 * @param {Object} req - Express request object, containing the customer ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with the customer or an error message.
 */
exports.GetOneCustomer = (req, res, next) => {

    const id = req.params.id;
    Customer.findById(id)
        .then(customer => res.status(200).json(customer))
        .catch(error => res.status(500).json(error));

};

/**
 * Creates a new customer and saves it to the database.
 *
 * @param {Object} req - Express request object, containing the customer data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with a success message or an error message.
 */
exports.CreateCustomer = (req, res, next) => {

    delete req.body._id;
    const customer = new Customer({
        ...req.body,
    });
    customer.save()
        .then(()=>res.status(201).json({message: 'Customer saved successfully.'}))
        .catch(error => res.status(400).json({message: 'Server error', error: error.message }));

};

/**
 * Updates an existing customer by its ID.
 *
 * @param {Object} req - Express request object, containing the customer ID in the parameters and updated data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with a success message or an error message.
 */
exports.UpdateCustomer = (req, res, next) => {

    Customer.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'Customer updated successfully.'}))
        .catch(error => res.status(400).json({ message: 'Server error', error: error.message }));

};

/**
 * Deletes a customer from the database by its ID.
 *
 * @param {Object} req - Express request object, containing the customer ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with a success message or an error message.
 */
exports.DeleteCustomer = (req, res, next) => {

    Customer.deleteOne({ _id: req.params.id })
        .then(()=>res.status(204).json({message :"delete succesfully"}))
        .catch(error => res.status(404).json({ message: 'Server error', error: error.message }))

};
