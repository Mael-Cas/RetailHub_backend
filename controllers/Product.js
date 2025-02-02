const Product = require('../models/Product')
const StoreProduct = require('../models/StoreProduct');
const mongoose = require("mongoose");



/**
 * Retrieves all products from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all products or an error message.
 */
exports.GetAllProducts = (req, res, next)=>{
    const limit = req.query.lmt ? req.query.lmt : 0;

    Product.find().limit(limit)
        .then(products => {
            if(!products) {
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
exports.GetOneProduct = async (req, res, next)=>{

    Product.findOne({SKU: req.params.sku})
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(()=>{
            res.status(404).send('No product found');
        })

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

   const {name, category, SKU, price, details, update, image} = req.body;

   const NewProduct = new Product({
       name,
       category,
       SKU,
       price,
       details,
       update,
       image,
   });
   NewProduct.save()
       .then(()=>res.status(200).json({message: 'Succesfully created'}))
       .catch(err=>{res.status(500).json({error:err.message})})

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

    Product.findOneAndUpdate({SKU : req.params.sku}, req.body)
        .then(()=>{res.status(200).json({message: "Product update successfully"})})
        .catch((err)=>{res.status(500).json({message:"Server error", error: err})})
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


    Product.deleteOne({SKU : req.params.sku})
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