const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
      status: String,
      phlebotomist: { type: Schema.Types.ObjectId, ref: 'Phlebotomist' },
      site: { type: Schema.Types.ObjectId, ref: 'Site' },
      weekday: String,
}, {
      timestamps: true
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;