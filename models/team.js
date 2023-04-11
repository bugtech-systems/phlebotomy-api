const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
     name: String,
     site: [{ type: Schema.Types.ObjectId, ref: 'Site' }],
     phlebotomist: [{ type: Schema.Types.ObjectId, ref: 'Phlebotomist' }],
}, {
     timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;