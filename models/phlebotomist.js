const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phlebotomistSchema = new Schema({
        status: String,
        first_name: String,
        last_name: String,
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
        address: String,
        start_time: Date,
        email: String,
        color: String,
        dispatch_histories: [{ type: Schema.Types.ObjectId, ref: 'DispatchHistory' }],
        schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }]
}, {
  timestamps: true
});

const Phlebotomist = mongoose.model('Phlebotomist', phlebotomistSchema);

module.exports = Phlebotomist;