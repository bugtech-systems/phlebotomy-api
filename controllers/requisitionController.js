const Requisition = require('../models/requisition');

exports.getAll = async (req, res) => {
  const panels = await Requisition.find();
  res.json(panels);
};

exports.getById = async (req, res) => {
  const panel = await Requisition.findById(req.params.id);
  res.json(panel);
};

exports.create = async (req, res) => {
  const panel = new Requisition(req.body);
  await panel.save();
  res.json(panel);
};

exports.update = async (req, res) => {
  await Requisition.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Requisition updated' });
};

exports.delete = async (req, res) => {
  await Requisition.findByIdAndDelete(req.params.id);
  res.json({ message: 'Requisition deleted' });
};