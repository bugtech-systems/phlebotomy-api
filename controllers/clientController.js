const Client = require('../models/client');

// Define controller methods for client
exports.getAll = async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
};

exports.getById = async (req, res) => {
  const client = await Client.findById(req.params.id);
  res.json(client);
};

exports.create = async (req, res) => {
  const client = new Client(req.body);
  await client.save();
  res.json(client);
};

exports.update = async (req, res) => {
  await Client.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Client updated' });
};

exports.delete = async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: 'Client deleted' });
};