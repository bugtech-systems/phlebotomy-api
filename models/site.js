const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Client = require('./client');
const Team = require('./team');


const siteSchema = new Schema({
      name: String,
      client: { type: Schema.Types.ObjectId, ref: 'Client' },
      site_type: String,
      team: { type: Schema.Types.ObjectId, ref: 'Team' },
      // schedule: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
      // requisition: [{ type: Schema.Types.ObjectId, ref: 'Requisition' }],
      // patient: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
      address: String,
      client_id: {
            type: Number
       },
       team_id: {
            type: Number
       },
      site_id: {
          type: Number,
          unique: true
     }
}, {
      timestamps: true
});



siteSchema.pre('save', { document: true, query: false }, async function (next) {
    const data = this;
    if (data.isNew) {
      let client = await Client.findOne({client_id: data.client_id});
      let team = await Team.findOne({team_id: data.team_id});
      
      console.log('SAVING')
      data.team = team;
      data.client = client;
      next();
    }
});





const Site = mongoose.model('Site', siteSchema);

module.exports = Site;