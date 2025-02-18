const mongoose = require('mongoose')
const StoreProduct = require('./StoreProduct')

/**
 * Product Schema defines the structure of the Product documents in the database.
 *
 * @typedef {Object} Product
 * @property {String} name - The name of the product.
 * @property {String} category - The category of the product.
 * @property {String} SKU - The Stock Keeping Unit, a unique identifier for the product, required.
 * @property {Number} price - The price of the product.
 * @property {Number} Current_stock - The current stock level of the product, required.
 * @property {Number} Reorder_level - The stock level at which the product should be reordered.
 * @property {String} Details - Additional details about the product.
 * @property {Date} Update - The date when the product was last updated.
 * @property {String} Image - The URL or path to the product's image.
 * @property {String} Slot - The storage slot or location for the product.
 */
const ProductSchema = mongoose.Schema({
    name: String,
    category: String,
    SKU : {type: String, unique:true, required: true},
    price: Number,
    details: String,
    update: Date,
    image: String,

})
ProductSchema.pre('findOneAndDelete', async function (next) {
    const product = await this.model.findOne(this.getQuery());
    if (product) {
        await StoreProduct.deleteMany({ productSKU: product.SKU });
    }
    next();
});



module.exports = mongoose.model('Product', ProductSchema)
