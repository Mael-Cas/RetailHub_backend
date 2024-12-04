const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    address : {type: mongoose.Schema.Types.ObjectId, ref : 'Address' , required: true},
    license_Number : {type: Number, required: true},
    phone: String,
    email: String,
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},{timestamps: true})

module.exports = mongoose.model('Store', StoreSchema)