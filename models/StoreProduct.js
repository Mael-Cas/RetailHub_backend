const mongoose = require('mongoose');

const StorePSchema = new mongoose.Schema({
    shopId: {type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true},
    slot: String,
    current_stock: {type: Number, required: true},
    reorder_level: Number,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
})

module.exports = mongoose.model('StoreProduct', StorePSchema);