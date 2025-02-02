const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    permissions: [
        {
            resource: { type: String, required: true },
            fields: [
                {
                    name: { type: String, required: true },
                    permission: { type: Number, required: true }
                }
            ]
        }
    ],
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }
});

module.exports = mongoose.model('Role', roleSchema);
