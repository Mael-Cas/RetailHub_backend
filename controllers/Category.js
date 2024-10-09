const Category = require('../models/Category');

/**
 * Retrieves all categories from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with all categories or an error message.
 */
exports.GetAllCategories =  (req, res) => {
    Category.find()
        .then((data) => {res.status(200).json(data)})
        .catch((err) => {res.status(500).json(err)});
}

/**
 * Creates a new category and saves it to the database.
 *
 * @param {Object} req - Express request object, containing the category data in the body.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with success message or an error message.
 */
exports.CreateCategory = (req, res) => {
    delete req.body._id;
    const newCategory = new Category({
        ...req.body,
    });
    newCategory.save()
        .then(() => res.status(201).json({message: 'Category saved successfully.'}))
        .catch(error => res.status(400).json({ message: 'Server error', error: error.message }));
}

/**
 * Deletes a category from the database by its ID.
 *
 * @param {Object} req - Express request object, containing the category ID in the parameters.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with success message or an error message.
 */
exports.DeleteCategory = (req, res) => {
    const id = req.params.id;
    Category.deleteOne({ _id: id })
        .then(() => res.status(204).json({message: 'Category deleted successfully.'}))
        .catch(error => res.status(400).json({ message: 'Server error', error: error.message }));
}