const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
      name: String,
      // site: [{ type: Schema.Types.ObjectId, ref: 'Site' }]
}, {
      timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;