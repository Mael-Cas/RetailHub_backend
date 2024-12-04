const Product = require('../models/Product')
const StoreProduct = require('../models/StoreProduct');
const mongoose = require("mongoose");



async function GetProductBySKU(SKU) {
    Product.findOne({ SKU: SKU })
        .then(product => {

            if(!product) {
                return null
            }else{

                StoreProduct.findOne({product: product._id}).populate('product')
                    .then(product => {
                        return product;
                    })

            }
        })
        .catch(error => {
            throw new Error(`An error occurred while finding StoreProduct by SKU: ${error.message}`)
        });
}



/**
 * Retrieves all products from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response with all products or an error message.
 */
exports.GetAllProducts = (req, res, next)=>{
    const limit = req.params.lmt ? req.params.lmt : 0;

    StoreProduct.find({shopId : req.auth.shopId}).limit(limit).populate('product')
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
exports.GetOneProduct = async (req, res, next)=>{

    StoreProduct.findOne({productSKU: req.params.sku, shopId: req.auth.shopId}).populate('product')
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

    try {

        const newProduct = {
            name: req.body.name,
            category: req.body.category,
            SKU : req.body.sku,
            price: req.body.price,
            details: req.body.details,
            image: req.body.image,
        };

        const newProductStore = {
            shopId: req.body.shopId,
            slot: req.body.slot,
            current_stock: req.body.current_stock,
            reorder_level: req.body.reorder_level,

        }

        Product.create(newProduct)
            .then(product => {
                newProduct.productSKU = product.SKU;
                StoreProduct.create(newProductStore)
                    .then(() => {
                        res.status(201).json({message: "Product create successfully"})
                    })
                    .catch(err => {res.status().json({message: "Server error", error: err})})
            })
            .catch(err => {res.status().json({message: "Server error", error: err})})

    }catch (err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }


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
    StoreProduct.findOneAndUpdate({_id : req.params.id}, req.body)
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


    StoreProduct.deleteOne(req.params.id)
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