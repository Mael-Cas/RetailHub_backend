const mongoose = require('mongoose')


/**
 * Sales Schema defines the structure of the Sales documents in the database.
 *
 * @typedef {Object} Sale
 * @property {Array<Object>} products - The array of products sold in this sale.
 * @property {String} products.SKU - The SKU of the product (reference to Product).
 * @property {Number} products.quantity - The quantity sold of this product.
 * @property {Number} products.price_per_unit - The price per unit of the product at the time of sale.
 * @property {Number} total_price - The total price of the sale.
 * @property {Date} sale_date - The date of the sale, defaulting to the current date and time.
 * @property {mongoose.Schema.Types.ObjectId} customer_id - The ID of the customer making the purchase (reference to Customer).
 * @property {String} payment_status - The status of the payment, can be 'Pending', 'Completed', or 'Cancelled'.
 * @property {String} payment_method - The method of payment used for this sale, e.g., 'Cash', 'Credit Card', etc.
 * @property {String} soldBy - The user who completed the sale (reference to User).
 * @property {Boolean} is_invoiced - Indicates whether the sale has been converted into an invoice, defaulting to false.
 */
const SalesSchema = mongoose.Schema({
    products: [
        {
            SKU: { type: String, ref: 'Product' }, // Référence au SKU du produit
            quantity: { type: Number, required: true },    // Quantité vendue de ce produit
            price_per_unit: { type: Number, required: true } // Prix unitaire du produit au moment de la vente
        }
    ],
    total_price: { type: Number, required: true },          // Prix total de la vente
    sale_date: { type: Date, default: Date.now },           // Date de la vente
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Référence au client
    payment_status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    }, // Statut du paiement
    payment_method: {
        type: String,
        enum: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal']
    }, // Méthode de paiement utilisée
    soldBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    is_invoiced: { type: Boolean, default: false },          // Indique si la vente a été transformée en facture
    shopId : {type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
});

module.exports = mongoose.model('Sales', SalesSchema);
