const mongoose  = require('mongoose');
const Validator = require('mongoose-unique-validator')

/**
 * User Schema defines the structure of the User documents in the database.
 *
 * @typedef {Object} User
 * @property {String} name - The name of the user.
 * @property {String} email - The email of the user, must be unique.
 * @property {String} password - The password for the user account.
 * @property {String} role - The role of the user, either 'ADMIN' or 'USER'. Defaults to 'USER'.
 * @property {Date} Create - The date when the user was created, defaults to the current date and time.
 */
const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref:'Store' },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    create: { type: Date, default: Date.now },
    invoice : [{type: mongoose.Schema.Types.ObjectId, ref: 'Sale'}],
})

UserSchema.plugin(Validator)

module.exports = mongoose.model('User', UserSchema);