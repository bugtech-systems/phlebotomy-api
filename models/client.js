const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  clientId: String
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
