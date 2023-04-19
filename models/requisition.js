const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Site = require('./site');
const Panel = require('./panel');
const Patient = require('./patient');



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
    patient_id: {
        type: Number
    },
    panel_id: {
        type: Number
    },
    site_id: {
        type: Number
    },
    requisition_id: {
          type: Number,
          unique: true
     }
    // samples: [{ type: Schema.Types.ObjectId, ref: 'Sample' }],
    // dispatch_histories: [{ type: Schema.Types.ObjectId, ref: 'DispatchHistory' }]
}, {
    timestamps: true
});



RequisitionSchema.pre('save', { document: true, query: false }, async function (next) {
    const data = this;
    if (data.isNew) {
        let panel, patient, site;
    let { panel_id, patient_id, site_id} = data;
    
    if(panel_id){
         panel = await Panel.findOne({panel_id: data.panel_id});
    }
            
    if(patient_id){
         patient = await Patient.findOne({patient_id: data.patient_id});
    }
    
    if(site_id){
         site = await Site.findOne({site_id: data.site_id});
    }
            

      console.log('Saving')
      console.log(site)
      data.site = site;
      data.panel = panel;
      data.patient = patient
      next();
    }
  });
  
  

module.exports = mongoose.model('Requisition', RequisitionSchema);
