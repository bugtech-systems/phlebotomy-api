const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  address: String,
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  name: String,
  siteId: String,
  siteType: String,
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  phlebotomySchedules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhlebotomySchedule'
  }]
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;