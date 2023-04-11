const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    first_name: String,
    last_name: String,
    site: [{ type: Schema.Types.ObjectId, ref: 'Site' }],
    address: String,
    date_of_birth: Date,
    // requisition: [{ type: Schema.Types.ObjectId, ref: 'Requisition' }]
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;