const Product = require('../models/Product');

/**
 * Retrieves all products from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all products or an error message.
 */
exports.GetAllProducts = (req, res, next)=>{
    Product.find()
        .then(products => {
            if(!products || products.length === 0) {
                res.status(404).send('No product found');
            }else{
                res.status(200).json(products);
            }
        })
        .catch(error => res.status(500).json({ message : 'Server error', error : error.message }));
};

/**
 * Retrieves a single product from the database by its SKU.
 *
 * @param {Object} req - Express request object, containing the SKU in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with the product or an error message.
 */
exports.GetOneProduct = (req, res, next)=>{
    const productSKU = req.params.sku; // Extract SKU from request parameters

    Product.findOne({ SKU: productSKU })
    .then(product => {

        if(!product) {
            res.status(404).json({message : 'Product not found'});
        }else{
            res.status(200).json(product);
        }
    })
    .catch(error => res.status(400).json({ message : 'Server error', error : error.message }));
};

/**
 * Creates a new product and saves it to the database.
 *
 * @param {Object} req - Express request object, containing the product data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with success or error message.
 */
exports.CreateProduct = (req, res, next)=>{

    const SKU = req.params.sku;

    Product.findOne({ SKU: SKU })
        .then(existingProduct => {
            if(existingProduct) {
                return res.status(400).json({message : 'Product already exists'});
            }

            const newProduct = new Product({
                ...req.body,
                Update: Date.now(),

            });
            newProduct.save()
                .then(() => {
                    res.status(201).json({ message: 'Product created successfully'});
                })
                .catch(error => {
                    res.status(500).json({ message: 'Error saving the product', error: error.message });
                });
        })
        .catch(error => res.status(400).json({ message : 'Server error', error : error.message }));
};

/**
 * Updates an existing product in the database by its SKU.
 *
 * @param {Object} req - Express request object, containing the SKU in the parameters and the updated product data in the body.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with success or error message.
 */
exports.UpdateProduct = (req, res, next) => {
    const productSKU = req.params.sku; // Extract SKU from request parameters
    const updatedData = req.body; // Extract updated product data from request body

    Product.findOneAndUpdate({ SKU: productSKU }, updatedData, { new: true, runValidators: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product updated successfully' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Server error', error: error.message });
        });
};

/**
 * Deletes a product from the database by its SKU.
 *
 * @param {Object} req - Express request object, containing the SKU in the parameters.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with success or error message.
 */
exports.DeleteProduct = (req, res, next)=>{
    const productSKU = req.params.sku;

    Product.findOneAndDelete({ SKU: productSKU })
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product deleted successfully'});
        })
        .catch(error => {
            res.status(500).json({ message: 'Server error', error: error.message });
        });
};