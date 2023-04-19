const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sampleSchema = new Schema({
    name: String,
    status: String,
    requisition: { type: Schema.Types.ObjectId, ref: 'Requisition' },
    collection_date: Date,
    type: String,
    method: String,
    container_type: String,
    sample_id: {
          type: Number,
          unique: true
     }
  }, {
    timestamps: true
});

const Sample = mongoose.model('Sample', sampleSchema);


module.exports = Sample
