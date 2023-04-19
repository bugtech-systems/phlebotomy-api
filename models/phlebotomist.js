const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team');



const phlebotomistSchema = new Schema({
        status: String,
        first_name: String,
        last_name: String,
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
        team_id: {
          type: Number
         },
        address: String,
        start_time: String,
        email: String,
        color: String,
        phlebotomist_id: {
          type: Number,
          unique: true
         }
        // dispatch_histories: [{ type: Schema.Types.ObjectId, ref: 'DispatchHistory' }],
        // schedule: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }]
}, {
  timestamps: true
});



phlebotomistSchema.pre('save', { document: true, query: false }, async function (next) {
  const data = this;
  if (data.isNew) {
    let team = await Team.findOne({team_id: data.team_id});
    console.log('Saving')
    console.log(team)
    data.team = team;
    next();
  }
});




const Phlebotomist = mongoose.model('Phlebotomist', phlebotomistSchema);

module.exports = Phlebotomist;