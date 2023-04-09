const mongoose = require('mongoose');

const phlebotomyScheduleSchema = new mongoose.Schema({
  weekday: String,
  phlebotomist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phlebotomist'
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site'
  }
});

const PhlebotomySchedule = mongoose.model('PhlebotomySchedule', phlebotomyScheduleSchema);

module.exports = PhlebotomySchedule;
