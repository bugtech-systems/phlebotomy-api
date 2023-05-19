const SampleSchema = new Schema({
  id: Number,
  method: String,
  container: String,
  collection_date: Date,
  collection_status: String,
  unsuccessful_reason: String,
});

const PhlebotomistSchema = new Schema({
  id: Number,
  first_name: String,
  last_name: String,
  user_email: String,
});

const SiteSchema = new Schema({
  id: Number,
  name: String,
  address: String,
  type: String,
  client: {
    id: Number,
    name: String,
  },
});

const PatientSchema = new Schema({
  id: Number,
  first_name: String,
  last_name: String,
  date_of_birth: { type: Date, required: false },
  phone: String,
  address: String,
});

const DispatchHistorySchema = new Schema({
  scheduled_date: Date,
  phlebotomist: PhlebotomistSchema,
  attempt_made: Boolean,
  end_of_day_timestamp: { type: Date, required: false },
  requisition_status: String,
  collection_date: { type: Date, required: false },
  received_date: { type: Date, required: false },
  provider: String,
  venipuncture: Boolean,
  requisition_comment: { type: String, required: false },
  phlebotomist_comment: { type: String, required: false },
  panels: [String],
  samples: [SampleSchema],
  site: SiteSchema,
  patient: PatientSchema,
});

const RequisitionSchema = new Schema({
  rid: { type: Number, required: true },
  status_change_date: { type: Date, required: false },
  dispatch_date: { type: Date, required: false },
  phlebotomist_email: String,
  dispatch_status: String,
  dispatch_history: DispatchHistorySchema,
});
