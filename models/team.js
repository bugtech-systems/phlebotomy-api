const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  phlebotomists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phlebotomist'
  }],
  sites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site'
  }]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
