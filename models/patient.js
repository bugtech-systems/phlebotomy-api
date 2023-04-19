const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Site = require('./site');



const patientSchema = new Schema({
    first_name: String,
    last_name: String,
    site: { type: Schema.Types.ObjectId, ref: 'Site' },
    site_id: {
      type: Number
    },
    address: String,
    phone: String,
    dob: Date,
    patient_id: {
          type: Number,
          unique: true
     }
    // requisition: [{ type: Schema.Types.ObjectId, ref: 'Requisition' }]
}, {
    timestamps: true
});





patientSchema.pre('save', { document: true, query: false }, async function (next) {
    const data = this;
    if (data.isNew) {
      let site = await Site.findOne({site_id: data.site_id});
      console.log('Saving')
      console.log(site)
      data.site = site;
      next();
    }
  });


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;