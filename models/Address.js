const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street_Number: {type: Number, required: true},
    street : {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    countryCode: {type: String, required: true},
});

module.exports = mongoose.model('Address', AddressSchema);
