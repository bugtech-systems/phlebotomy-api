const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
      name: String,
      client: { type: Schema.Types.ObjectId, ref: 'Client' },
      site_type: String,
      team: { type: Schema.Types.ObjectId, ref: 'Team' },
      // schedule: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
      // requisition: [{ type: Schema.Types.ObjectId, ref: 'Requisition' }],
      // patient: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
      address: String
}, {
      timestamps: true
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;