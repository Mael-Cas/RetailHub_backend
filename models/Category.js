const mongoose = require('mongoose');
const Validator = require('mongoose-unique-validator');

/**
 * Category Schema defines the structure of the Category documents in the database.
 *
 * @typedef {Object} Category
 * @property {String} name - The name of the category. It is a required and unique field.
 */
const CategorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
})

CategorySchema.plugin(Validator);

module.exports = mongoose.model('Category', CategorySchema);