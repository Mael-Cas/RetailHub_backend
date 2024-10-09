const mongoose = require('mongoose');

/**
 * Restocks Alert Schema defines the structure of the Restocks Alert documents in the database.
 *
 * @typedef {Object} RestocksAlert
 * @property {String} ref_product - The reference identifier for the product associated with the alert.
 * @property {Number} current_level - The current stock level of the product.
 * @property {String} reason - The reason for the alert.
 * @property {Date} alert_date - The date the alert was created, defaulting to the current date and time.
 * @property {Boolean} resolve - Indicates whether the alert has been resolved, defaulting to false.
 */
const restocksAlertSchema = mongoose.Schema({
    ref_product: String,
    current_level: Number,
    reason: String,
    alert_date: {type: Date, default: Date.now},
    resolve: {type: Boolean, default: false},
})

module.exports = mongoose.model('RestocksAlert', restocksAlertSchema)