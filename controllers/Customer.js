const Customer = require('../models/Customer');
const Address = require('../models/Address');

/**
 * Retrieves all customers from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all customers or an error message.
 */
exports.GetAllCustomers = (req, res, next) => {

    const limit = req.params.lmt ? req.params.lmt : 0;

    Customer.find().limit(limit).populate('address')
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

    const {street_Number, street, city, state, country, countryCode} = req.body.address;

    delete req.body.address;

    const newAddress = new Address({
        street_Number,
        street,
        city,
        state,
        country,
        countryCode,
    });
    newAddress.save()
        .then(address => {
            const customer = new Customer({
                ...req.body,
                address: address._id,
            });
            customer.save()
                .then(()=>res.status(201).json({message: 'Customer saved successfully.'}))
                .catch(error => res.status(400).json({message: 'Server error', error: error.message }));
    });





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

    Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )
        .then(customer => {
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found.' });
            }
            res.status(200).json({
                message: 'Customer updated successfully.',
                customer
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Server error.',
                error: error.message
            });
        });


};

/**
 * Deletes a customer from the database by its ID.
 *
 * @param {Object} req - Express request object, containing the customer ID in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with a success message or an error message.
 */
exports.DeleteCustomer = async (req, res, next) => {

    try {
        // Trouver le client à supprimer
        const customer = await Customer.findOne({_id:req.params.id});
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        // Supprimer le client, ce qui déclenche le middleware pour supprimer l'adresse associée
        await customer.deleteOne();

        res.status(200).json({ message: 'Customer and associated address deleted successfully.' });
    } catch (error) {
        res.status(400).json({ message: 'Server error', error: error.message });
    }
};
