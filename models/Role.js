const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    permissions: [{
        resource: { type: String, required: true }, // ex : "Product"
        actions: [{
            field: { type: String, required: true }, // ex : "name", "price"
            permission: { type: String, enum: ['read', 'create', 'update', 'delete'], required: true }
        }]
    }],
    shopId : { type: mongoose.Schema.Types.ObjectId, ref:'Store'}
});

const Role = mongoose.model('Role', roleSchema);
