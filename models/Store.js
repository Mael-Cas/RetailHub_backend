const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    address : {type: mongoose.Schema.Types.ObjectId, ref : 'Address' , required: true},
    license_Number : {type: Number, required: true},
    phone: String,
    email: String,
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Store', StoreSchema)