const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    role: {
        type: String,
        enum: ['phlebotomist', 'courier'],
        default: 'phlebotomist'
    },
}, {
    timestamps: true
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;