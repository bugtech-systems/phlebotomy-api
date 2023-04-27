const mongoose = require('mongoose');

const { Schema } = mongoose;

const SampleSchema = new Schema({
  id: { type: Number },
  type: { type: String },
  method: { type: String },
  container: { type: String },
  collection_date: { type: Date },
  collection_status: { type: String },
});

const PhlebotomistSchema = new Schema({
  id: { type: Number },
  first_name: { type: String },
  last_name: { type: String },
  user_email: { type: String },
});

const SiteSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  address: { type: String },
  type: { type: String },
  client: {
    id: { type: Number },
    name: { type: String },
  },
});

const PatientSchema = new Schema({
  id: { type: Number },
  first_name: { type: String },
  last_name: { type: String },
  date_of_birth: { type: Date, required: false },
  phone: { type: String },
  address: { type: String },
});

const DispatchHistorySchema = new Schema({
  scheduled_date: { type: Date },
  phlebotomist: { type: PhlebotomistSchema },
  attempt_made: { type: Boolean },
  end_of_day_timestamp: { type: Date, required: false },
  requisition_status: { type: String },
  collection_date: { type: Date, required: false },
  received_date: { type: Date, required: false },
  provider: { type: String },
  requisition_comment: { type: String, required: false },
  phlebotomist_comment: { type: String, required: false },
  panels: [{ type: String }],
  samples: [{ type: SampleSchema }],
  site: { type: SiteSchema },
  patient: { type: PatientSchema },
});

const RequisitionSchema = new Schema({
  rid: { type: Number, required: true },
  status_change_date: { type: Date, required: false },
  dispatch_date: { type: Date, required: false },
  phlebotomist_email: { type: String},
  dispatch_status: { type: String },
  dispatch_history: { type: DispatchHistorySchema },
});

// RequisitionSchema.pre('save', { document: true, query: false }, async function (next) {
//   const data = this;
//   if (data.isNew) {
//     let dispatch_history = data.dispatch_history ? data.dispatch_history : null;
//       if(dispatch_history){
//         let { scheduled_date, phlebotomist } = dispatch_history;
//         if(scheduled_date) {
//               data.dispatch_date = scheduled_date;
//         }
        
//         if(phlebotomist && phlebotomist.user_email){
//           data.phlebotomist_email = phlebotomist.user_email
//         }
//       }
      
//     next();
//   }
// });


const Requisition = mongoose.model('rids', RequisitionSchema);

module.exports = Requisition;
