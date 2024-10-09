const mongoose = require('mongoose');
const Validator = require('mongoose-unique-validator');

/**
 * Customer Schema defines the structure of the Customer documents in the database.
 *
 * @typedef {Object} Customer
 * @property {String} name - The name of the customer.
 * @property {String} email - The email of the customer, which must be unique and is required.
 * @property {String} phone - The phone number of the customer, which must be unique and is required.
 * @property {String} address - The address of the customer, required.
 * @property {Boolean} invoice - Indicates if the customer has requested an invoice. Defaults to `false`.
 */
const CustomerSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true, required: true},
    phone: {type: String, unique: true, required: true},
    address: {type: String, required: true},
    invoice: {type: Boolean, default: false},
})

CustomerSchema.plugin(Validator);


module.exports = mongoose.model('Customer', CustomerSchema);