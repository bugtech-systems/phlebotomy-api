const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequisitionSchema = new Schema({
    status: String,
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    collection_date: Date,
    received_date: Date,
    provider: String,
    site: { type: Schema.Types.ObjectId, ref: 'Site' },
    comment: String,
    phlebotomist_comment: String,
    panel: { type: Schema.Types.ObjectId, ref: 'Panel' },
    samples: [{ type: Schema.Types.ObjectId, ref: 'Sample' }],
    dispatch_histories: [{ type: Schema.Types.ObjectId, ref: 'DispatchHistory' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Requisition', RequisitionSchema);
