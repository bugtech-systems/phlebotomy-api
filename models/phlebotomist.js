const mongoose = require('mongoose');

const phlebotomistSchema = new mongoose.Schema({
  status: String,
  firstName: String,
  lastName: String,
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  color: String,
  emailAddress: String,
  startingAddress: String,
  startTime: Date
});

const Phlebotomist = mongoose.model('Phlebotomist', phlebotomistSchema);

module.exports = Phlebotomist;
