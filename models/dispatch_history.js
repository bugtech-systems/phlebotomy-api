const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Phlebotomist = require('./phlebotomist');
const Requisition = require('./requisition');



const dispatchHistorySchema = new Schema({
            date: Date,
            phlebotomist: { type: Schema.Types.ObjectId, ref: 'Phlebotomist' },
            requisition: { type: Schema.Types.ObjectId, ref: 'Requisition' },
            attempt_made: Boolean,
            phlebotomist_id: {
              type: Number
            },
            requisition_id: {
              type: Number
            },
            dispatch_id: {
                type: Number
           }
  }, {
    timestamps: true
});

dispatchHistorySchema.pre('save', { document: true, query: false }, async function (next) {
  const data = this;
  if (data.isNew) {
  
    let phlebotomist, requisition;
    let {  requisition_id, phlebotomist_id} = data;
    
    if(phlebotomist_id){
      phlebotomist = await Phlebotomist.findOne({phlebotomist_id: data.phlebotomist_id});
    }
            
    if(requisition_id){
      requisition = await Requisition.findOne({requisition_id: data.requisition_id});
    }
  
    
    console.log('Saving')
    data.phlebotomist = phlebotomist;
    data.requisition = requisition;
    next();
  }
});


const DispatchHistory = mongoose.model('DispatchHistory', dispatchHistorySchema);

module.exports = DispatchHistory;